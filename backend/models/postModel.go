package models

import (
	"example/yx/db"
)

type Post struct {
	ID              int    `db:"id" json:"id"`
	UserRef         int    `db:"userref" json:"userref"`
	Location        string `db:"location" json:"location"`
	Description     string `db:"description" json:"description"`
	UserPicturePath string `db:"userpicturepath" json:"userpicturepath"`
	PicturePath     string `db:"picturepath" json:"picturepath"`
	LikesCount      int    `db:"likescount" json:"likescount"`
	CommentsCount   int    `db:"commentscount" json:"commentscount"`
	Username        string `json:"username"`
}

func GetAllPosts() ([]Post, error) {
	var posts []Post
	err := db.DB.Select(&posts, `SELECT id, userref, location, description, userpicturepath, picturepath, likescount, commentscount FROM posts`)
	if err != nil {
		return nil, err
	}
	return posts, nil
}


func CreatePost(post Post) (Post, error) {
	query := `INSERT INTO posts (userref, location, description, userpicturepath, picturepath, likescount, commentscount) 
	          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`

	// Ejecutar la consulta y capturar el ID generado
	err := db.DB.QueryRow(query, post.UserRef, post.Location, post.Description, post.UserPicturePath, post.PicturePath, post.LikesCount, post.CommentsCount).Scan(&post.ID)
	if err != nil {
		return Post{}, err
	}

	return post, nil
}
