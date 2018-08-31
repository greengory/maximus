//package models
package main

// package name should be main since it has the main function which is the
//entry point of a golang application. Go will not run a non-main package.

import (
	"database/sql"
	"time"

	_ "github.com/lib/pq"
)

type Tasks struct {
	ID        int
	Title     string
	Done      bool
	UserID    int
	CreatedAt time.Time
}

var Db *sql.DB

func main() {
	var err error

	Db, err = sql.Open("postgres", "user=postgres dbname=go_app sslmode=disable")
	if err != nil {
		panic(err)
	}
}

func (task *Tasks) Create() error {
	query := "insert into tasks (title, user_id) values ($1, $2) returning id, done"

	stmt, err := Db.Prepare(query)

	if err != nil {
		panic(err)
	}

	stmt.Close()
	//Task struct has no field User_id and Id
	//err = stmt.QueryRow(task.Title, task.User_id).Scan(&task.Id, &task.Done)
	err = stmt.QueryRow(task.Title, task.UserID).Scan(&task.ID, &task.Done)
	if err != nil {
		return err
	}
	//Since the function signature returns an error, the function cannot just return hence we return nil
	return nil
}
