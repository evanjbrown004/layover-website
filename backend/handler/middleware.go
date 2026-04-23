package handler

import (
	"log"
	"net/http"
	"time"
)

type responseWriter struct {
	http.ResponseWriter
	status int
}

func (rw *responseWriter) WriteHeader(status int) {
	rw.status = status
	rw.ResponseWriter.WriteHeader(status)
}

// LogRequests logs the method, path, response status, and duration of every request.
// Errors (5xx) are logged separately so they stand out.
func LogRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		rw := &responseWriter{ResponseWriter: w, status: http.StatusOK}

		next.ServeHTTP(rw, r)

		duration := time.Since(start)

		if rw.status >= 500 {
			log.Printf("ERROR %s %s -> %d (%s)", r.Method, r.URL.Path, rw.status, duration)
		} else {
			log.Printf("%s %s -> %d (%s)", r.Method, r.URL.Path, rw.status, duration)
		}
	})
}
