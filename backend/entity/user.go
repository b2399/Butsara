package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name string
}

type Doctor struct {
	gorm.Model
	Name      string
	Email     string     `gorm:"uniqueIndex"`
	Overtimes []Overtime `gorm:"foreignKey:DoctorID"`
}
type Activity struct {
	gorm.Model
	Name      string
	Time      time.Time
	Overtimes []Overtime `gorm:"foreignKey:ActivityID"`
}
type Workplace struct {
	gorm.Model
	Name      string
	Address   string
	Overtimes []Overtime `gorm:"foreignKey:WorkplaceID"`
}
type Overtime struct {
	gorm.Model
	Num  int
	Time time.Time

	//DoctorID ทำหน้าที่เป็น FK
	DoctorID *uint
	Doctor   Doctor

	//ActivityID ทำหน้าที่เป็น FK
	ActivityID *uint
	Activity   Activity

	//LocationID ทำหน้าที่เป็น FK
	WorkplaceID *uint
	Workplace   Workplace
}
