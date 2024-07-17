package models

import (
	"errors"
	"example/yx/db"
	"time"
)

type Like struct {
	ID        int       `db:"id" json:"id"`
	PostID    int       `db:"postid" json:"postId"`
	UserID    int       `db:"userid" json:"userId"`
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

func GetLikesByPostID(postID int) ([]Like, error) {
	var likes []Like
	query := `SELECT id, postid, userid FROM likes WHERE postid = $1`
	err := db.DB.Select(&likes, query, postID)
	if err != nil {
		return nil, err
	}
	return likes, nil
}

func Likeexist(like Like) error {
	var exists bool
	err := db.DB.Get(&exists, `SELECT exists(SELECT 1 FROM likes WHERE userid=$1 AND postid=$2)`, like.UserID, like.PostID)
	if err != nil {
		return err
	}

	if exists {
		return errors.New("like already given")
	}

	return nil
}
