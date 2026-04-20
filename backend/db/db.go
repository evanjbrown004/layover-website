package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() (*sql.DB, error) {
	host := getenv("DB_HOST", "localhost")
	port := getenv("DB_PORT", "3306")
	user := getenv("DB_USER", "layover")
	pass := os.Getenv("DB_PASS")
	name := getenv("DB_NAME", "layover")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", user, pass, host, port, name)
	return sql.Open("mysql", dsn)
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
