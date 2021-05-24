package database

import (
	"errors"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	connection, err := gorm.Open(sqlite.Open("db.db"),
		&gorm.Config{})
	if err != nil {
		return errors.New("cannot connect to the database")
	}
	DB = connection
	return nil
}
