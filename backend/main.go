package main

import (
	"github.com/b2399/sa-65/controller"

	"github.com/b2399/sa-65/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// Overtime Routes

	r.GET("/overtimes", controller.ListOvertime)

	r.GET("/overtime/:id", controller.GetOvertime)

	r.POST("/Overtimes", controller.CreateOvertime)

	// Doctor Routes

	r.GET("/doctors", controller.ListDoctor)

	// Activity Routes

	r.GET("/activities", controller.ListActivitys)

	// Workplace Routes

	r.GET("/workplaces", controller.Listworkplaces)

	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
