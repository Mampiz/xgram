package routes

import (
	"example/yx/controllers"
	"example/yx/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	router.GET("/users", controllers.GetUsers)
	router.POST("/register", controllers.RegisterUser)
	router.POST("/login", controllers.LoginUser)
	router.POST("/friend", controllers.AddFriend)
	router.POST("/upload", controllers.UploadImage)
	router.GET("/validate", middleware.RequireAuth, controllers.Validate)
}

func TestRoutes(router *gin.Engine) {
	router.GET("/", controllers.GetInitial)
}
