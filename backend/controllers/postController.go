package controllers

import (
	"example/yx/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPosts(c *gin.Context) {
	posts, err := models.GetAllPosts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for i, post := range posts {
		username, err := models.GetUsernameByID(post.UserRef)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		posts[i].Username = username
	}

	c.JSON(http.StatusOK, posts)
}
