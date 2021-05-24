package models

import "gorm.io/gorm"

type Users struct {
	gorm.Model
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `gorm:"unique" json:"email"`
}
