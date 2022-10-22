package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Activity{}, &Doctor{}, &Workplace{}, &Overtime{},
	)

	db = database

	//Doctor Data
	Doc1 := Doctor{
		Name:  "Phonsak songsang",
		Email: "Phon@gmail.com",
	}
	db.Model(&Doctor{}).Create(&Doc1)

	Doc2 := Doctor{
		Name:  "Hanoi slotmachine",
		Email: "Hanoi @gmail.com",
	}
	db.Model(&Doctor{}).Create(&Doc2)

	Doc3 := Doctor{
		Name:  "Kanokthip Lamai",
		Email: "Kanok@gmail.com",
	}
	db.Model(&Doctor{}).Create(&Doc3)

	//Activity Data
	morningduty := Activity{
		Name: "morningduty",
		Time: time.Date(2022, 9, 10, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Activity{}).Create(&morningduty)

	nightduty := Activity{
		Name: "nightduty",
		Time: time.Date(2022, 9, 13, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Activity{}).Create(&nightduty)

	extraduty := Activity{
		Name: "extraduty",
		Time: time.Date(2022, 9, 15, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Activity{}).Create(&extraduty)

	//Workplace Data
	OP := Workplace{
		Name:    "Outpatient",
		Address: "Suranaree 1 floor",
	}
	db.Model(&Workplace{}).Create(&OP)

	IP := Workplace{
		Name:    "Inpatient",
		Address: "Suranaree 2,3 floor",
	}
	db.Model(&Workplace{}).Create(&IP)

	ER := Workplace{
		Name:    "Emergency",
		Address: "Suranaree 1 floor",
	}
	db.Model(&Workplace{}).Create(&ER)

	SUR := Workplace{
		Name:    "Surgery",
		Address: "Suranaree 4 floor",
	}
	db.Model(&Workplace{}).Create(&SUR)

	//Overtime Data
	//overtime1
	db.Model(&Overtime{}).Create(&Overtime{
		Doctor:    Doc1,
		Activity:  morningduty,
		Workplace: OP,
		Num:       7,
		Time:      time.Date(2022, 9, 11, 6, 0, 0, 0, time.Now().Location()),
	})
	//overtime2
	db.Model(&Overtime{}).Create(&Overtime{
		Doctor:    Doc2,
		Activity:  nightduty,
		Workplace: IP,
		Num:       8,
		Time:      time.Date(2022, 9, 13, 8, 0, 0, 0, time.Now().Location()),
	})
	//overtime3
	db.Model(&Overtime{}).Create(&Overtime{
		Doctor:    Doc3,
		Activity:  extraduty,
		Workplace: ER,
		Num:       6,
		Time:      time.Date(2022, 9, 15, 5, 0, 0, 0, time.Now().Location()),
	})

}
