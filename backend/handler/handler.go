package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/evanbrown/layover/backend/store"
)

type Handler struct {
	Q *store.Queries
}

func (h *Handler) writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func (h *Handler) writeError(w http.ResponseWriter, status int, msg string) {
	h.writeJSON(w, status, map[string]string{"error": msg})
}

// GET /airports
func (h *Handler) ListAirports(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	q := r.URL.Query().Get("q")

	var (
		airports []store.Airport
		err      error
	)

	if q != "" {
		like := "%" + strings.ToLower(q) + "%"
		airports, err = h.Q.SearchAirports(ctx, store.SearchAirportsParams{
			ID:   like,
			City: like,
			Name: like,
		})
	} else {
		airports, err = h.Q.ListAirports(ctx)
	}

	if err != nil {
		h.writeError(w, http.StatusInternalServerError, "failed to query airports")
		return
	}
	if airports == nil {
		airports = []store.Airport{}
	}
	h.writeJSON(w, http.StatusOK, airports)
}

// GET /airports/{code}
func (h *Handler) GetAirport(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	a, err := h.Q.GetAirport(r.Context(), code)
	if err == sql.ErrNoRows {
		h.writeError(w, http.StatusNotFound, "airport not found")
		return
	}
	if err != nil {
		h.writeError(w, http.StatusInternalServerError, "failed to query airport")
		return
	}
	h.writeJSON(w, http.StatusOK, a)
}

// GET /airports/{code}/itineraries?duration=5
func (h *Handler) ListItineraries(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	code := strings.ToUpper(r.PathValue("code"))

	if _, err := h.Q.GetAirport(ctx, code); err == sql.ErrNoRows {
		h.writeError(w, http.StatusNotFound, "airport not found")
		return
	}

	var (
		itineraries []store.Itinerary
		err         error
	)

	if d := r.URL.Query().Get("duration"); d != "" {
		n, convErr := strconv.Atoi(d)
		if convErr != nil || n < 1 {
			h.writeError(w, http.StatusBadRequest, "duration must be a positive integer")
			return
		}
		itineraries, err = h.Q.ListItinerariesByDuration(ctx, store.ListItinerariesByDurationParams{
			AirportID:        code,
			MinDurationHours: int32(n),
		})
	} else {
		itineraries, err = h.Q.ListItineraries(ctx, code)
	}

	if err != nil {
		h.writeError(w, http.StatusInternalServerError, "failed to query itineraries")
		return
	}
	if itineraries == nil {
		itineraries = []store.Itinerary{}
	}
	h.writeJSON(w, http.StatusOK, map[string]any{
		"airport":     code,
		"itineraries": itineraries,
	})
}

// GET /airports/{code}/itineraries/{id}
func (h *Handler) GetItinerary(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	code := strings.ToUpper(r.PathValue("code"))
	id := r.PathValue("id")

	if _, err := h.Q.GetAirport(ctx, code); err == sql.ErrNoRows {
		h.writeError(w, http.StatusNotFound, "airport not found")
		return
	}

	it, err := h.Q.GetItineraryWithSteps(ctx, code, id)
	if err != nil {
		h.writeError(w, http.StatusInternalServerError, "failed to query itinerary")
		return
	}
	if it == nil {
		h.writeError(w, http.StatusNotFound, "itinerary not found")
		return
	}
	h.writeJSON(w, http.StatusOK, it)
}

// GET /airports/{code}/logistics
func (h *Handler) GetLogistics(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	code := strings.ToUpper(r.PathValue("code"))

	if _, err := h.Q.GetAirport(ctx, code); err == sql.ErrNoRows {
		h.writeError(w, http.StatusNotFound, "airport not found")
		return
	}

	lg, err := h.Q.GetLogistics(ctx, code)
	if err == sql.ErrNoRows {
		h.writeError(w, http.StatusNotFound, "no logistics data for this airport")
		return
	}
	if err != nil {
		h.writeError(w, http.StatusInternalServerError, "failed to query logistics")
		return
	}
	h.writeJSON(w, http.StatusOK, lg)
}
