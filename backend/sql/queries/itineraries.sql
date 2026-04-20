-- name: ListItineraries :many
SELECT * FROM itineraries WHERE airport_id = ?;

-- name: ListItinerariesByDuration :many
SELECT * FROM itineraries
WHERE airport_id = ? AND min_duration_hours <= ?;

-- name: GetItinerary :one
SELECT * FROM itineraries WHERE id = ? AND airport_id = ?;

-- name: CreateItinerary :exec
INSERT INTO itineraries (id, airport_id, duration_hours, title, summary, min_duration_hours)
VALUES (?, ?, ?, ?, ?, ?);

-- name: UpdateItinerary :exec
UPDATE itineraries
SET title = ?, summary = ?, duration_hours = ?, min_duration_hours = ?
WHERE id = ? AND airport_id = ?;

-- name: DeleteItinerary :exec
DELETE FROM itineraries WHERE id = ? AND airport_id = ?;
