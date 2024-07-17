package routes

import (
	"example/yx/controllers"

	"github.com/gin-gonic/gin"
)

func PostRoutes(router *gin.Engine) {
	router.GET("/post", controllers.GetPosts)
	router.GET("/post/:id", controllers.GetPostByIdd)
	router.POST("/post", controllers.CreatePost)
}
