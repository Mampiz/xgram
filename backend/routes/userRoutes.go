package routes

import (
	"example/yx/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	router.GET("/users", controllers.GetUsers)
	router.POST("/register", controllers.RegisterUser)
	router.POST("/login", controllers.LoginUser)
}

func TestRoutes(router *gin.Engine) {
	router.GET("/", controllers.GetInitial)
}
