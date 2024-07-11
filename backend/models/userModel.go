package models

import (
	"errors"
	"example/yx/db"
)

type User struct {
	ID            int    `db:"id" json:"id"`
	Username      string `db:"username" json:"username"`
	FirstName     string `db:"firstname" json:"firstname"`
	LastName      string `db:"lastname" json:"lastname"`
	Email         string `db:"email" json:"email"`
	Password      string `db:"password" json:"password"`
	PicturePath   string `db:"picturepath" json:"picturepath"`
	Location      string `db:"location" json:"location"`
	ViewedProfile int    `db:"viewedprofile" json:"viewedprofile"`
	Impressions   int    `db:"impressions" json:"impressions"`
}

func GetAllUsers() ([]User, error) {
	var users []User
	err := db.DB.Select(&users, `SELECT id, username, firstname, lastname, email, password, picturepath, location, viewedprofile, impressions FROM users`)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func GetUsernameByID(userID int) (string, error) {
	var username string
	err := db.DB.Get(&username, `SELECT username FROM users WHERE id = $1`, userID)
	if err != nil {
		return "", err
	}
	return username, nil
}

func RegisterUser(user User) error {
	var exists bool
	// siempre que accedas a db guarda en err porque eso nos permite sabes si hay error en el acceso
	err := db.DB.Get(&exists, `SELECT exists(SELECT 1 FROM users WHERE username=$1 OR email=$2)`, user.Username, user.Email)
	if err != nil {
		return err
	}

	// aquí creamos un error que gestionamos en el controller con err.Error()
	if exists {
		return errors.New("username or email already exists")
	}

	_, err = db.DB.Exec(`INSERT INTO users (username, firstname, lastname, email, password, picturepath, location, viewedprofile, impressions)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		user.Username, user.FirstName, user.LastName, user.Email, user.Password, user.PicturePath, user.Location, user.ViewedProfile, user.Impressions)
	return err
}
