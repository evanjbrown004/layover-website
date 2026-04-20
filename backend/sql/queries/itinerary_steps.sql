-- name: ListSteps :many
SELECT * FROM itinerary_steps
WHERE itinerary_id = ?
ORDER BY step_order;

-- name: GetStep :one
SELECT * FROM itinerary_steps WHERE id = ? AND itinerary_id = ?;

-- name: CreateStep :exec
INSERT INTO itinerary_steps (id, itinerary_id, step_order, title, description, duration_minutes, transit_minutes, transit_method, cost)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdateStep :exec
UPDATE itinerary_steps
SET title = ?, description = ?, duration_minutes = ?, transit_minutes = ?, transit_method = ?, cost = ?
WHERE id = ? AND itinerary_id = ?;

-- name: DeleteStep :exec
DELETE FROM itinerary_steps WHERE id = ? AND itinerary_id = ?;
