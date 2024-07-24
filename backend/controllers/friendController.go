package controllers

import (
	"example/yx/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func AddFriend(c *gin.Context) {
	var friend models.Friend
	if err := c.ShouldBindJSON(&friend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := uuid.Parse(friend.UserID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	if _, err := uuid.Parse(friend.FriendID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
		return
	}

	err := models.FriendExist(friend)
	if err != nil {
		if err.Error() == "already friends" {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	newFollow, err := models.AddFriend(friend)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newFollow)
}
