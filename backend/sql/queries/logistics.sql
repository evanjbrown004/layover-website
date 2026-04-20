-- name: GetLogistics :one
SELECT * FROM logistics WHERE airport_id = ?;

-- name: CreateLogistics :exec
INSERT INTO logistics (id, airport_id, visa_notes, bag_storage_notes, reentry_notes)
VALUES (UUID(), ?, ?, ?, ?);

-- name: UpdateLogistics :exec
UPDATE logistics
SET visa_notes = ?, bag_storage_notes = ?, reentry_notes = ?, last_updated = NOW()
WHERE airport_id = ?;

-- name: DeleteLogistics :exec
DELETE FROM logistics WHERE airport_id = ?;
