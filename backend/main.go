package main

import (
	"jwt_auth/database"
	"jwt_auth/models"
	"jwt_auth/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	err := database.Connect()
	if err != nil {
		panic(err)
	}
	database.DB.AutoMigrate(&models.Users{})
	app := fiber.New()
	routes.Setup(app)
	app.Listen(":8000")
}
