package routes

import (
	"example/yx/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	router.GET("/users", controllers.GetUsers)
}

func TestRoutes(router *gin.Engine) {
	router.GET("/", controllers.GetInitial)
}
