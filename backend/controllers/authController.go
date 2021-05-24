package controllers

import (
	"errors"
	"jwt_auth/database"
	"jwt_auth/models"
	"strings"
	"time"

	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// User struct for the json response

type LoginBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

//Validators (will be improved later)

func ValidateEmail(user *models.Users) error {
	email := user.Email
	var obj models.Users
	database.DB.Find(&obj, "email = ?", email)

	if (models.Users{}) != obj {
		return errors.New("a user with this email already exists")

	}
	return nil

}

func ValidateUsername(user *models.Users) error {
	username := user.Username
	var obj models.Users

	database.DB.Find(&obj, "username = ?", username)
	if obj != (models.Users{}) {
		return errors.New("a user with this username already exists")
	}
	if len(username) < 6 {
		return errors.New("the username is too short")
	}
	if strings.Contains(username, "@") {
		return errors.New("the username cannot contain @")
	}

	return nil
}

func VlidatePassword(user *models.Users) error {
	password := user.Password
	if len(password) < 6 {
		return errors.New("the password is too short")
	}
	return nil
}

func Validate(user *models.Users) []string {
	var errors []string
	if err := ValidateEmail(user); err != nil {
		errors = append(errors, err.Error())

	}
	if err := ValidateUsername(user); err != nil {
		errors = append(errors, err.Error())

	}
	if err := VlidatePassword(user); err != nil {
		errors = append(errors, err.Error())

	}
	return errors

}

func Register(c *fiber.Ctx) error {
	user := new(models.Users)
	if err := c.BodyParser(&user); err != nil {
		return c.JSON(err.Error())
	}
	errors := Validate(user)
	if len(errors) > 0 {
		c.SendStatus(400)
		return c.JSON(&fiber.Map{
			"errors": errors,
		})

	}
	password := []byte(user.Password)
	hash, err := bcrypt.GenerateFromPassword(password,
		bcrypt.DefaultCost)
	if err != nil {
		return c.SendString("Error")
	}
	user.Password = string(hash)

	database.DB.Create(user)

	return c.JSON(&fiber.Map{
		"username": user.Username,
		"email":    user.Email,
	})

}

func Login(c *fiber.Ctx) error {
	var loginBody LoginBody
	var User models.Users
	if err := c.BodyParser(&loginBody); err != nil {
		return c.JSON(err.Error())
	}
	email := loginBody.Email
	database.DB.Find(&User, "email = ?", email)
	if User == (models.Users{}) {
		c.SendStatus(400)
		return c.JSON(&fiber.Map{
			"error": "a user with this email does not exist",
		})
	}
	err := bcrypt.CompareHashAndPassword([]byte(User.Password),
		[]byte(loginBody.Password))
	if err != nil {
		c.SendStatus(400)
		return c.JSON(&fiber.Map{
			"error": "wrong password",
		})
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["username"] = User.Username
	claims["email"] = User.Email
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		c.SendStatus(500)
		return err
	}
	return c.JSON(&fiber.Map{
		"token": t,
	})

}
