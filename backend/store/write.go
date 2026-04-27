package store

import (
	"context"
	"crypto/rand"
	"database/sql"
	"fmt"
)

// NewUUID generates a random UUID v4.
func NewUUID() string {
	b := make([]byte, 16)
	rand.Read(b)
	b[6] = (b[6] & 0x0f) | 0x40
	b[8] = (b[8] & 0x3f) | 0x80
	return fmt.Sprintf("%08x-%04x-%04x-%04x-%012x",
		b[0:4], b[4:6], b[6:8], b[8:10], b[10:16])
}

// UpdateAirport updates all editable fields of an airport.
// (sqlc only generated UpdateAirportCoverageStatus, not a full update.)
type UpdateAirportParams struct {
	ID                    string
	Name                  string
	City                  string
	Country               string
	CoverageStatus        AirportsCoverageStatus
	CustomsReentryMinutes int32
	Timezone              string
}

func (q *Queries) UpdateAirport(ctx context.Context, p UpdateAirportParams) error {
	_, err := q.db.ExecContext(ctx,
		`UPDATE airports
		 SET name=?, city=?, country=?, coverage_status=?, customs_reentry_minutes=?, timezone=?
		 WHERE id=?`,
		p.Name, p.City, p.Country, string(p.CoverageStatus), p.CustomsReentryMinutes, p.Timezone, p.ID,
	)
	return err
}

// UpdateStepFull updates all editable step fields including step_order.
// (The sqlc-generated UpdateStep omits step_order.)
type UpdateStepFullParams struct {
	ID              string
	ItineraryID     string
	StepOrder       int32
	Title           string
	Description     string
	DurationMinutes int32
	TransitMinutes  int32
	TransitMethod   sql.NullString
	Cost            sql.NullString
}

func (q *Queries) UpdateStepFull(ctx context.Context, p UpdateStepFullParams) error {
	_, err := q.db.ExecContext(ctx,
		`UPDATE itinerary_steps
		 SET step_order=?, title=?, description=?, duration_minutes=?, transit_minutes=?, transit_method=?, cost=?
		 WHERE id=? AND itinerary_id=?`,
		p.StepOrder, p.Title, p.Description, p.DurationMinutes, p.TransitMinutes,
		p.TransitMethod, p.Cost, p.ID, p.ItineraryID,
	)
	return err
}

// UpsertLogistics creates or updates the logistics row for an airport.
type UpsertLogisticsParams struct {
	AirportID       string
	VisaNotes       sql.NullString
	BagStorageNotes sql.NullString
	ReentryNotes    sql.NullString
}

func (q *Queries) UpsertLogistics(ctx context.Context, p UpsertLogisticsParams) error {
	_, err := q.db.ExecContext(ctx,
		`INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes, last_updated)
		 VALUES (UUID(), ?, ?, ?, ?, NOW())
		 ON DUPLICATE KEY UPDATE
		   visa_notes        = VALUES(visa_notes),
		   bag_storage_notes = VALUES(bag_storage_notes),
		   reentry_notes     = VALUES(reentry_notes),
		   last_updated      = NOW()`,
		p.AirportID, p.VisaNotes, p.BagStorageNotes, p.ReentryNotes,
	)
	return err
}
