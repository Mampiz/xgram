package routes

import (
	"example/yx/controllers"
	"example/yx/middleware"

	"github.com/gin-gonic/gin"
)

func FriendRoutes(router *gin.Engine) { //router.GET("/friend/:id", controllers.GetAllFriend)
	router.POST("/addfriend", controllers.AddFriend)
	router.GET("/friend/:id", controllers.GetAllFriend)
	router.GET("/friends/:id", middleware.RequireAuth, controllers.GetFriends)
}
