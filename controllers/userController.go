package controllers

import (
	"example/yx/db"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	var users []db.User
	err := db.DB.Select(&users, `SELECT id, firstname, lastname, email, password, picturepath, location, occupation, viewedprofile, impressions FROM "User"`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

func GetInitial(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Santi premium panic roller"})
}
