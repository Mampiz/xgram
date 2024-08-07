package models

import (
	"errors"
	"example/yx/db"
)

// Definición de la estructura Post
type Post struct {
	ID            string `db:"id" json:"id"` // UUID como string
	UserRef       string `db:"userref" json:"userref"`
	Location      string `db:"location" json:"location"`
	Description   string `db:"description" json:"description"`
	ImageURL      string `db:"image_url" json:"imageurl"`
	LikesCount    int    `db:"likescount" json:"likescount"`
	CommentsCount int    `db:"commentscount" json:"commentscount"`
	Username      string `json:"username"`
	UserImageURL  string `db:"user_image_url" json:"user_image_url"`
	CreatedAt     string `db:"createdat" json:"created_at"`
}

// Obtener todos los posts
func GetAllPosts() ([]Post, error) {
	var posts []Post
	query := `
		SELECT p.id, p.userref, u.username, p.location, p.description, u.image_url, p.image_url, p.likescount, p.commentscount, p.createdat
		FROM posts p
		JOIN users u ON p.userref = u.id
		ORDER BY p.createdat DESC`
	err := db.DB.Select(&posts, query)
	if err != nil {
		return nil, err
	}
	if posts == nil {
		posts = []Post{}
	}
	return posts, nil
}

// Crear un nuevo post
func CreatePost(post Post) (Post, error) {
	query := `INSERT INTO posts (userref, location, description, image_url, likescount, commentscount) 
	          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	err := db.DB.QueryRow(query, post.UserRef, post.Location, post.Description, post.ImageURL, post.LikesCount, post.CommentsCount).Scan(&post.ID)
	if err != nil {
		return Post{}, err
	}
	return post, nil
}

// Obtener un post por ID
func GetPostByID(id string) (Post, error) {
	var post Post
	query := `
		SELECT p.id, p.userref, u.username, p.location, p.description, u.image_url AS user_image_url, p.image_url, p.likescount, p.commentscount
		FROM posts p
		JOIN users u ON p.userref = u.id
		WHERE p.id = $1`
	err := db.DB.Get(&post, query, id)
	if err != nil {
		return post, errors.New("post not found")
	}
	return post, nil
}

// Obtener posts por ID de usuario
func GetPostsByUserID(userID string) ([]Post, error) {
	var posts []Post
	query := `
		SELECT p.id, p.userref, u.username, p.location, p.description, u.image_url AS user_image_url, p.image_url, p.likescount, p.commentscount
		FROM posts p
		JOIN users u ON p.userref = u.id
		WHERE p.userref = $1`
	err := db.DB.Select(&posts, query, userID)
	if err != nil {
		return nil, err
	}
	return posts, nil
}

// Obtener todos los posts de los usuarios que el usuario sigue
func GetAllPostsFollowing(userid string) ([]Post, error) {
	var posts []Post
	query := `
		SELECT p.id, p.userref, u.username, p.location, p.description, u.image_url AS user_image_url, p.image_url, p.likescount, p.commentscount, p.createdat
		FROM posts p
		JOIN users u ON p.userref = u.id
		ORDER BY p.createdat DESC`
	err := db.DB.Select(&posts, query)
	if err != nil {
		return nil, err
	}
	if posts == nil {
		posts = []Post{}
	}
	var newPosts []Post
	for i := 0; i < len(posts); i++ {
		idd := posts[i].UserRef
		var exists bool
		err := db.DB.Get(&exists, `SELECT exists(SELECT 1 FROM friends WHERE userid=$1 AND friendid=$2)`, userid, idd)
		if err == nil && exists {
			newPosts = append(newPosts, posts[i])
		}
	}
	return newPosts, nil
}
