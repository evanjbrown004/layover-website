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

	// Public
	mux.HandleFunc("GET /airports", h.ListAirports)
	mux.HandleFunc("GET /airports/{code}", h.GetAirport)
	mux.HandleFunc("GET /airports/{code}/itineraries", h.ListItineraries)
	mux.HandleFunc("GET /airports/{code}/itineraries/{id}", h.GetItinerary)
	mux.HandleFunc("GET /airports/{code}/logistics", h.GetLogistics)

	// Admin auth
	mux.HandleFunc("POST /admin/login", h.Login)

	// Admin CRUD (require valid session token)
	mux.HandleFunc("POST /admin/airports", handler.RequireAdmin(h.AdminCreateAirport))
	mux.HandleFunc("PUT /admin/airports/{code}", handler.RequireAdmin(h.AdminUpdateAirport))
	mux.HandleFunc("DELETE /admin/airports/{code}", handler.RequireAdmin(h.AdminDeleteAirport))

	mux.HandleFunc("POST /admin/airports/{code}/itineraries", handler.RequireAdmin(h.AdminCreateItinerary))
	mux.HandleFunc("PUT /admin/airports/{code}/itineraries/{id}", handler.RequireAdmin(h.AdminUpdateItinerary))
	mux.HandleFunc("DELETE /admin/airports/{code}/itineraries/{id}", handler.RequireAdmin(h.AdminDeleteItinerary))

	mux.HandleFunc("POST /admin/airports/{code}/itineraries/{id}/steps", handler.RequireAdmin(h.AdminCreateStep))
	mux.HandleFunc("PUT /admin/airports/{code}/itineraries/{id}/steps/{stepId}", handler.RequireAdmin(h.AdminUpdateStep))
	mux.HandleFunc("DELETE /admin/airports/{code}/itineraries/{id}/steps/{stepId}", handler.RequireAdmin(h.AdminDeleteStep))

	mux.HandleFunc("PUT /admin/airports/{code}/logistics", handler.RequireAdmin(h.AdminUpsertLogistics))

	log.Println("listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler.LogRequests(mux)))
}
