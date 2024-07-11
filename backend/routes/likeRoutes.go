package routes

import (
	"example/yx/controllers"

	"github.com/gin-gonic/gin"
)

func LikeRoutes(router *gin.Engine) {
	router.GET("/posts/:postid/likes", controllers.GetLikes) // Nueva ruta para obtener los likes de un post
	router.POST("/likes", controllers.CreateLike) 
}
