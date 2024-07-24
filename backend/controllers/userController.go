package controllers

import (
	"example/yx/models"
	"example/yx/services"
	"net/http"
	"strconv"

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

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.RegisterUser(user)
	if err != nil {
		if err.Error() == "username or email already exists" {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

func LoginUser(c *gin.Context) {
	var loginData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.AuthenticateUser(loginData.Username, loginData.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"user":    user,
	})
}

func UploadImage(c *gin.Context) {
	file, fileHeader, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file"})
		return
	}
	defer file.Close()

	s3Uploader, err := services.NewS3Uploader()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create S3 uploader"})
		return
	}

	fileName, err := s3Uploader.UploadFile(file, fileHeader)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	imageURL := "https://" + s3Uploader.BucketName + ".s3.amazonaws.com/" + fileName

	// Suponiendo que tienes el user_id en el contexto como string, convertir a int
	userIDStr := c.PostForm("user_id")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Guarda la URL de la imagen en la base de datos
	err = models.SaveProfileImageURL(userID, imageURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save image URL"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": imageURL})
}
