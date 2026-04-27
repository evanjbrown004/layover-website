package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/evanbrown/layover/backend/store"
)

func nullString(s *string) sql.NullString {
	if s == nil || *s == "" {
		return sql.NullString{}
	}
	return sql.NullString{String: *s, Valid: true}
}

// ---- Airports ----

type airportBody struct {
	ID                    string `json:"id"`
	Name                  string `json:"name"`
	City                  string `json:"city"`
	Country               string `json:"country"`
	CoverageStatus        string `json:"coverage_status"`
	CustomsReentryMinutes int32  `json:"customs_reentry_minutes"`
	Timezone              string `json:"timezone"`
}

func (h *Handler) AdminCreateAirport(w http.ResponseWriter, r *http.Request) {
	var b airportBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	b.ID = strings.ToUpper(strings.TrimSpace(b.ID))
	if b.ID == "" || b.Name == "" {
		h.writeError(w, http.StatusBadRequest, "id and name are required")
		return
	}
	if err := h.Q.CreateAirport(r.Context(), store.CreateAirportParams{
		ID:                    b.ID,
		Name:                  b.Name,
		City:                  b.City,
		Country:               b.Country,
		CoverageStatus:        store.AirportsCoverageStatus(b.CoverageStatus),
		CustomsReentryMinutes: b.CustomsReentryMinutes,
		Timezone:              b.Timezone,
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	a, _ := h.Q.GetAirport(r.Context(), b.ID)
	h.writeJSON(w, http.StatusCreated, a)
}

func (h *Handler) AdminUpdateAirport(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	var b airportBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Q.UpdateAirport(r.Context(), store.UpdateAirportParams{
		ID:                    code,
		Name:                  b.Name,
		City:                  b.City,
		Country:               b.Country,
		CoverageStatus:        store.AirportsCoverageStatus(b.CoverageStatus),
		CustomsReentryMinutes: b.CustomsReentryMinutes,
		Timezone:              b.Timezone,
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	a, _ := h.Q.GetAirport(r.Context(), code)
	h.writeJSON(w, http.StatusOK, a)
}

func (h *Handler) AdminDeleteAirport(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	if err := h.Q.DeleteAirport(r.Context(), code); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// ---- Itineraries ----

type itineraryBody struct {
	DurationHours    int32  `json:"duration_hours"`
	Title            string `json:"title"`
	Summary          string `json:"summary"`
	MinDurationHours int32  `json:"min_duration_hours"`
}

func (h *Handler) AdminCreateItinerary(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	var b itineraryBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	id := store.NewUUID()
	if err := h.Q.CreateItinerary(r.Context(), store.CreateItineraryParams{
		ID:               id,
		AirportID:        code,
		DurationHours:    b.DurationHours,
		Title:            b.Title,
		Summary:          b.Summary,
		MinDurationHours: b.MinDurationHours,
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	it, _ := h.Q.GetItineraryWithSteps(r.Context(), code, id)
	h.writeJSON(w, http.StatusCreated, it)
}

func (h *Handler) AdminUpdateItinerary(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	id := r.PathValue("id")
	var b itineraryBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Q.UpdateItinerary(r.Context(), store.UpdateItineraryParams{
		ID:               id,
		AirportID:        code,
		Title:            b.Title,
		Summary:          b.Summary,
		DurationHours:    b.DurationHours,
		MinDurationHours: b.MinDurationHours,
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	it, _ := h.Q.GetItineraryWithSteps(r.Context(), code, id)
	h.writeJSON(w, http.StatusOK, it)
}

func (h *Handler) AdminDeleteItinerary(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	id := r.PathValue("id")
	if err := h.Q.DeleteItinerary(r.Context(), store.DeleteItineraryParams{
		ID:        id,
		AirportID: code,
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// ---- Steps ----

type stepBody struct {
	StepOrder       int32   `json:"step_order"`
	Title           string  `json:"title"`
	Description     string  `json:"description"`
	DurationMinutes int32   `json:"duration_minutes"`
	TransitMinutes  int32   `json:"transit_minutes"`
	TransitMethod   *string `json:"transit_method"`
	Cost            *string `json:"cost"`
}

func (h *Handler) AdminCreateStep(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	itineraryID := r.PathValue("id")
	var b stepBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Q.CreateStep(r.Context(), store.CreateStepParams{
		ID:              store.NewUUID(),
		ItineraryID:     itineraryID,
		StepOrder:       b.StepOrder,
		Title:           b.Title,
		Description:     b.Description,
		DurationMinutes: b.DurationMinutes,
		TransitMinutes:  b.TransitMinutes,
		TransitMethod:   nullString(b.TransitMethod),
		Cost:            nullString(b.Cost),
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	it, _ := h.Q.GetItineraryWithSteps(r.Context(), code, itineraryID)
	h.writeJSON(w, http.StatusCreated, it)
}

func (h *Handler) AdminUpdateStep(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	itineraryID := r.PathValue("id")
	stepID := r.PathValue("stepId")
	var b stepBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Q.UpdateStepFull(r.Context(), store.UpdateStepFullParams{
		ID:              stepID,
		ItineraryID:     itineraryID,
		StepOrder:       b.StepOrder,
		Title:           b.Title,
		Description:     b.Description,
		DurationMinutes: b.DurationMinutes,
		TransitMinutes:  b.TransitMinutes,
		TransitMethod:   nullString(b.TransitMethod),
		Cost:            nullString(b.Cost),
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	it, _ := h.Q.GetItineraryWithSteps(r.Context(), code, itineraryID)
	h.writeJSON(w, http.StatusOK, it)
}

func (h *Handler) AdminDeleteStep(w http.ResponseWriter, r *http.Request) {
	itineraryID := r.PathValue("id")
	stepID := r.PathValue("stepId")
	if err := h.Q.DeleteStep(r.Context(), store.DeleteStepParams{
		ID:          stepID,
		ItineraryID: itineraryID,
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// ---- Logistics ----

type logisticsBody struct {
	VisaNotes       *string `json:"visa_notes"`
	BagStorageNotes *string `json:"bag_storage_notes"`
	ReentryNotes    *string `json:"reentry_notes"`
}

func (h *Handler) AdminUpsertLogistics(w http.ResponseWriter, r *http.Request) {
	code := strings.ToUpper(r.PathValue("code"))
	var b logisticsBody
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if err := h.Q.UpsertLogistics(r.Context(), store.UpsertLogisticsParams{
		AirportID:       code,
		VisaNotes:       nullString(b.VisaNotes),
		BagStorageNotes: nullString(b.BagStorageNotes),
		ReentryNotes:    nullString(b.ReentryNotes),
	}); err != nil {
		h.writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	lg, _ := h.Q.GetLogistics(r.Context(), code)
	h.writeJSON(w, http.StatusOK, lg)
}
