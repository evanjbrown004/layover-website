package store

import (
	"context"
	"database/sql"
	"fmt"
)

type ItineraryWithSteps struct {
	Itinerary
	Steps []ItineraryStep `json:"steps"`
}

// GetItineraryWithSteps fetches an itinerary and its ordered steps in one call.
func (q *Queries) GetItineraryWithSteps(ctx context.Context, airportID, id string) (*ItineraryWithSteps, error) {
	it, err := q.GetItinerary(ctx, GetItineraryParams{ID: id, AirportID: airportID})
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get itinerary: %w", err)
	}

	steps, err := q.ListSteps(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("list steps: %w", err)
	}

	return &ItineraryWithSteps{Itinerary: it, Steps: steps}, nil
}
