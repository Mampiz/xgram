package routes

import (
	"example/yx/controllers"

	"github.com/gin-gonic/gin"
)

func FriendRoutes(router *gin.Engine) { //router.GET("/friend/:id", controllers.GetAllFriend)
	router.POST("/addfriend", controllers.AddFriend)
	router.GET("/friend/:id", controllers.GetAllFriend)

}
