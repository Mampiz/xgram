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

type UserFriend struct {
	ID            string `db:"id" json:"id"`
	Username      string `db:"username" json:"username"`
	FirstName     string `db:"firstname" json:"firstname"`
	LastName      string `db:"lastname" json:"lastname"`
	Email         string `db:"email" json:"email"`
	Password      string `db:"password" json:"password"`
	ViewedProfile int    `db:"viewedprofile" json:"viewedprofile"`
	Impressions   int    `db:"impressions" json:"impressions"`
	ImageURL      string `db:"image_url" json:"imageurl"`
}

func AddFriend(friend Friend) (Friend, error) {
	_, err := db.DB.Exec(`INSERT INTO friends (userid, friendid)
		VALUES ($1, $2) RETURNING id`,
		friend.UserID, friend.FriendID)
	if err != nil {
		return Friend{}, err
	}
	return friend, nil
}

func FriendExists(friend Friend) error {
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

func AllFriends(userid string) ([]UserFriend, error) {
	var friends []UserFriend
	query := `SELECT u.id, u.username, u.firstname, u.lastname, u.email, u.password, u.viewedprofile, u.impressions, u.image_url
			  FROM friends f
			  JOIN users u ON f.friendid = u.id
			  WHERE f.userid = $1`
	err := db.DB.Select(&friends, query, userid)
	if err != nil {
		return friends, err
	}
	return friends, nil
}

func GetUserFriends(userid string) ([]User, error) {
	var users []User
	query := `
  		WITH friendTable AS (
			SELECT
				CASE
					WHEN userid = $1 THEN friendid
					WHEN friendid = $1 THEN userid
				END AS friend
			FROM friends
			WHERE $1 IN (friendid, userid)
			GROUP BY friend
			HAVING COUNT(*) = 2
		)
		SELECT users.*
		FROM users
		JOIN friendTable ON users.id = friendTable.friend;`

	err := db.DB.Select(&users, query, userid)

	if err != nil {
		return nil, err
	}
	return users, nil
}
