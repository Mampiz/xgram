package models

import (
	"errors"
	"example/yx/db"
	"time"
)

type Like struct {
	ID        string    `db:"id" json:"id"`
	PostID    string    `db:"postid" json:"postId"`
	UserID    string    `db:"userid" json:"userId"`
	CreatedAt time.Time `db:"createdat" json:"createdAt"`
}

func CreateLike(like Like) (Like, error) {
	query := `INSERT INTO likes (postid, userid)
	          VALUES ($1, $2) RETURNING id`
	err := db.DB.QueryRow(query, like.PostID, like.UserID).Scan(&like.ID)
	if err != nil {
		return Like{}, err
	}
	return like, nil
}

func GetLikesByPostID(postID string) ([]Like, error) {
	var likes []Like
	query := `SELECT id, postid, userid, createdat FROM likes WHERE postid = $1`
	err := db.DB.Select(&likes, query, postID)
	if err != nil {
		return nil, err
	}
	return likes, nil
}

func LikeExists(like Like) error {
	var exists bool
	query := `SELECT exists(SELECT 1 FROM likes WHERE userid=$1 AND postid=$2)`
	err := db.DB.Get(&exists, query, like.UserID, like.PostID)
	if err != nil {
		return err
	}

	if exists {
		return errors.New("like already given")
	}

	return nil
}
