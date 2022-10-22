package controller

import (
	"github.com/b2399/sa-65/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /overtimes

func CreateOvertime(c *gin.Context) {

	var overtime entity.Overtime
	var activity entity.Activity
	var workplace entity.Workplace
	var doctor entity.Doctor

	if err := c.ShouldBindJSON(&overtime); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// ค้นหา Doctor ด้วย id
	if tx := entity.DB().Where("id = ?", overtime.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
		return
	}

	// ค้นหา Activit ด้วย id
	if tx := entity.DB().Where("id = ?", overtime.ActivityID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity not found"})
		return
	}

	// ค้นหา Workplace ด้วย id
	if tx := entity.DB().Where("id = ?", overtime.WorkplaceID).First(&workplace); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Workplace not found"})
		return
	}
	
	//สร้าง overtime
	sd := entity.Overtime{
		Doctor:  doctor,             // โยงความสัมพันธ์กับ Entity doctor
		Workplace: workplace,                  // โยงความสัมพันธ์กับ workPlace
		Activity:    activity,               // โยงความสัมพันธ์กับ Entity medactivity
		Time: overtime.Time,
		Num :  overtime.Num,
	}
	if err := entity.DB().Create(&sd).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}


	c.JSON(http.StatusOK, gin.H{"data": sd})

}

// GET /overtime/:id

func GetOvertime(c *gin.Context) {

	var overtime entity.Overtime

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM overtimes WHERE id = ?", id).Scan(&overtime).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": overtime})

}

// GET /overtimes
func ListOvertime(c *gin.Context) {

	var overtimes []entity.Overtime

	if err := entity.DB().Preload("Workplace").Preload("Doctor").Preload("Activity").Raw("SELECT * FROM overtimes").Find(&overtimes).Error; err != nil {
		//ดึงตารางย่อยมา .preload
		c.JSON(http.StatusBadRequest,gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": overtimes})

}

// GET /doctors
func ListDoctor(c *gin.Context) {

	var doctors []entity.Doctor

	if err := entity.DB().Raw("SELECT * FROM doctors").Scan(&doctors).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": doctors})

}

// GET /activitys
func ListActivitys(c *gin.Context) {

	var activitys []entity.Activity

	if err := entity.DB().Raw("SELECT * FROM activities").Scan(&activitys).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": activitys})

}

// GET /workplaces
func Listworkplaces(c *gin.Context) {

	var workplaces []entity.Workplace

	if err := entity.DB().Raw("SELECT * FROM workplaces").Scan(&workplaces).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": workplaces})

}
