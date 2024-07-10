// main.go
package main

import (
	"example/yx/db"
	"example/yx/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()

	router := gin.Default()

	routes.UserRoutes(router)
	routes.TestRoutes(router)

	log.Fatal(router.Run(":8080"))
}
