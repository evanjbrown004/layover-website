package main

import (
	"log"
	"net/http"

	"github.com/evanbrown/layover/backend/db"
	"github.com/evanbrown/layover/backend/handler"
	"github.com/evanbrown/layover/backend/store"
)

func main() {
	conn, err := db.Connect()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	if err := conn.Ping(); err != nil {
		log.Fatalf("database unreachable: %v", err)
	}
	defer conn.Close()

	h := &handler.Handler{Q: store.New(conn)}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /airports", h.ListAirports)
	mux.HandleFunc("GET /airports/{code}", h.GetAirport)
	mux.HandleFunc("GET /airports/{code}/itineraries", h.ListItineraries)
	mux.HandleFunc("GET /airports/{code}/itineraries/{id}", h.GetItinerary)
	mux.HandleFunc("GET /airports/{code}/logistics", h.GetLogistics)

	log.Println("listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
