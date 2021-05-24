package routes

import (
	"jwt_auth/controllers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v2"
)

func Setup(app *fiber.App) {
	app.Use(cors.New())
	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	}))
	app.Get("/", controllers.Home)

}
