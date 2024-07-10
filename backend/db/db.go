package db

import (
	"log"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbSSLMode := os.Getenv("DB_SSLMODE")

	connStr := "user=" + dbUser + " password=" + dbPassword + " dbname=" + dbName + " sslmode=" + dbSSLMode
	DB, err = sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatalln(err)
	}
}

type User struct {
	ID            int    `db:"id" json:"id"`
	FirstName     string `db:"firstname" json:"firstname"`
	LastName      string `db:"lastname" json:"lastname"`
	Email         string `db:"email" json:"email"`
	Password      string `db:"password" json:"password"`
	PicturePath   string `db:"picturepath" json:"picturepath"`
	Location      string `db:"location" json:"location"`
	Occupation    string `db:"occupation" json:"occupation"`
	ViewedProfile int    `db:"viewedprofile" json:"viewedprofile"`
	Impressions   int    `db:"impressions" json:"impressions"`
}

type Post struct {
	ID              int    `db:"id" json:"id"`
	UserRef         int    `db:"userref" json:"userRef"`
	FirstName       string `db:"firstname" json:"firstName"`
	LastName        string `db:"lastname" json:"lastName"`
	Location        string `db:"location" json:"location"`
	Description     string `db:"description" json:"description"`
	UserPicturePath string `db:"userpicturepath" json:"userPicturePath"`
	PicturePath     string `db:"picturepath" json:"picturePath"`
}

type Friend struct {
	ID       int `db:"id" json:"id"`
	UserID   int `db:"userid" json:"userId"`
	FriendID int `db:"friendid" json:"friendId"`
}

type Like struct {
	ID     int `db:"id" json:"id"`
	PostID int `db:"postid" json:"postId"`
	UserID int `db:"userid" json:"userId"`
}

type Comment struct {
	ID          int       `db:"id" json:"id"`
	PostID      int       `db:"postid" json:"postId"`
	UserID      int       `db:"userid" json:"userId"`
	CommentText string    `db:"commenttext" json:"commentText"`
	CreatedAt   time.Time `db:"createdat" json:"createdAt"`
}
