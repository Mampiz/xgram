package models

import (
	"errors"
	"example/yx/db"
)

type Friend struct {
	ID       string `db:"id" json:"id"`
	UserID   string `db:"userid" json:"userId"`
	FriendID string `db:"friendid" json:"friendId"`
}

func AddFriend(friend Friend) (Friend, error) {
	_, err := db.DB.Exec(`INSERT INTO friends (userid, friendid)
		VALUES ($1, $2)`,
		friend.UserID, friend.FriendID)
	if err != nil {
		return Friend{}, err
	}
	return friend, nil
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
