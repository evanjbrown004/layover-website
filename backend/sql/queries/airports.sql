-- name: ListAirports :many
SELECT * FROM airports;

-- name: SearchAirports :many
SELECT * FROM airports
WHERE id LIKE ? OR city LIKE ? OR name LIKE ?;

-- name: GetAirport :one
SELECT * FROM airports WHERE id = ?;

-- name: CreateAirport :exec
INSERT INTO airports (id, name, city, country, coverage_status, customs_reentry_minutes, timezone)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- name: UpdateAirportCoverageStatus :exec
UPDATE airports SET coverage_status = ? WHERE id = ?;

-- name: DeleteAirport :exec
DELETE FROM airports WHERE id = ?;
