package controllers

import (
	"example/yx/db"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPosts(c *gin.Context) {
	var posts []db.Post
	err := db.DB.Select(&posts, `SELECT id, userref, location, description, userpicturepath, picturepath, likescount, commentscount FROM posts`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for i, post := range posts {
		var user db.User
		err := db.DB.Get(&user, `SELECT username FROM users WHERE id = $1`, post.UserRef)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		posts[i].Username = user.Username
	}

	c.JSON(http.StatusOK, posts)
}
