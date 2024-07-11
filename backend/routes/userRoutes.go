package routes

import (
	"example/yx/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	router.GET("/users", controllers.GetUsers)
	router.POST("/register", controllers.RegisterUser)
}

func TestRoutes(router *gin.Engine) {
	router.GET("/", controllers.GetInitial)
}
