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
	PicturePath   string `db:"picturepath" json:"picturepath"`
	Location      string `db:"location" json:"location"`
	ViewedProfile int    `db:"viewedprofile" json:"viewedprofile"`
	Impressions   int    `db:"impressions" json:"impressions"`
	ImageURL      string `db:"image_url" json:"imageurl"`
}

type Friend struct {
	ID       int `db:"id" json:"id"`
	UserID   int `db:"userid" json:"userId"`
	FriendID int `db:"friendid" json:"friendId"`
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

	_, err = db.DB.Exec(`INSERT INTO users (username, firstname, lastname, email, password, picturepath, location, viewedprofile, impressions, image_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
		user.Username, user.FirstName, user.LastName, user.Email, user.Password, user.PicturePath, user.Location, user.ViewedProfile, user.Impressions, user.ImageURL)
	return err
}

func AuthenticateUser(username, password string) (User, error) {
	var user User
	query := `SELECT id, username, firstname, lastname, email, password, picturepath, location, viewedprofile, impressions, image_url FROM users WHERE username=$1`
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

func AddFriend(userid, friendid int) error {
	_, err := db.DB.Exec(`INSERT INTO friends (userid, friendid)
		VALUES ($1, $2)`,
		userid, friendid)
	if err != nil {
		return err
	}
	return nil
}

func FriendExist(friend Friend) error {
	var exists bool
	err := db.DB.Get(&exists, `SELECT exists(SELECT 1 FROM friends WHERE userid=$1 AND friendid=$2)`, friend.UserID, friend.FriendID)
	if err != nil {
		return err
	}

	if exists {
		return errors.New("already friends")
	}

	return nil
}

func SaveProfileImageURL(userID int, imageURL string) error {
	query := `UPDATE users SET image_url = $1 WHERE id = $2`
	_, err := db.DB.Exec(query, imageURL, userID)
	return err
}
