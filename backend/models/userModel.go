package models

import (
	"errors"
	"example/yx/db"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID            string `db:"id" json:"id"`
	Username      string `db:"username" json:"username"`
	FirstName     string `db:"firstname" json:"firstname"`
	LastName      string `db:"lastname" json:"lastname"`
	Email         string `db:"email" json:"email"`
	Password      string `db:"password" json:"password"`
	ViewedProfile int    `db:"viewedprofile" json:"viewedprofile"`
	Impressions   int    `db:"impressions" json:"impressions"`
	ImageURL      string `db:"image_url" json:"imageurl"`
	CreatedAt     string `db:"createdat" json:"created_at"`
}

func GetAllUsers() ([]User, error) {
	var users []User
	err := db.DB.Select(&users, `SELECT id, username, firstname, lastname, email, password, viewedprofile, impressions, image_url, createdAt FROM users`)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func GetUsernameByID(userID string) (string, error) {
	var username string
	err := db.DB.Get(&username, `SELECT username FROM users WHERE id = $1`, userID)
	if err != nil {
		return "", err
	}
	return username, nil
}

func RegisterUser(user User) error {
	var exists bool
	err := db.DB.Get(&exists, `SELECT exists(SELECT 1 FROM users WHERE username=$1 OR email=$2)`, user.Username, user.Email)
	if err != nil {
		return err
	}

	if exists {
		return errors.New("username or email already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	_, err = db.DB.Exec(`INSERT INTO users (id, username, firstname, lastname, email, password, viewedprofile, impressions, image_url, createdAt)
		VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, DEFAULT)`,
		user.Username, user.FirstName, user.LastName, user.Email, user.Password, user.ViewedProfile, user.Impressions, user.ImageURL)
	return err
}

func AuthenticateUser(username, password string) (User, error) {
	var user User
	query := `SELECT id, username, firstname, lastname, email, password, viewedprofile, impressions, image_url, createdAt FROM users WHERE username=$1`
	err := db.DB.Get(&user, query, username)
	if err != nil {
		// Log the actual error
		fmt.Printf("Error fetching user: %v\n", err)
		return User{}, errors.New("invalid username or password")
	}

	// Compare the hashed password with the provided password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		// Log the actual error
		fmt.Printf("Password mismatch: %v\n", err)
		return User{}, errors.New("invalid username or password")
	}

	return user, nil
}

func SaveProfileImageURL(userID string, imageURL string) error {
	query := `UPDATE users SET image_url = $1 WHERE id = $2`
	_, err := db.DB.Exec(query, imageURL, userID)
	return err
}
