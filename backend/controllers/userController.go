package controllers

import (
	"example/yx/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	users, err := models.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

func GetInitial(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Santi premium panic roller"})
}

func RegisterUser(c *gin.Context) {
	var user models.User

	// esto sirve para comprobar si el json tiene el formato correcto
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.RegisterUser(user)
	// nil es como null y esto basicamente significa que si el err no es nulo pues eso
	if err != nil {
		// esto basicamente con el error que hemos devuelto en el model
		if err.Error() == "username or email already exists" {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		} else {
			// el tipico error 500
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// esto es en caso de que no haya error
	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}
