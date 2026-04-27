package handler

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

var (
	sessionsMu sync.Mutex
	sessions   = map[string]time.Time{}
)

func generateToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return hex.EncodeToString(b)
}

// RequireAdmin is middleware that validates the Bearer token.
func RequireAdmin(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		auth := r.Header.Get("Authorization")
		if !strings.HasPrefix(auth, "Bearer ") {
			http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
			return
		}
		token := strings.TrimPrefix(auth, "Bearer ")
		sessionsMu.Lock()
		exp, ok := sessions[token]
		sessionsMu.Unlock()
		if !ok || time.Now().After(exp) {
			http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
			return
		}
		next(w, r)
	}
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Login handles POST /admin/login.
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		h.writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	adminUser := os.Getenv("ADMIN_USERNAME")
	adminPass := os.Getenv("ADMIN_PASSWORD")

	if req.Username != adminUser || req.Password != adminPass {
		h.writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	token := generateToken()
	sessionsMu.Lock()
	sessions[token] = time.Now().Add(24 * time.Hour)
	sessionsMu.Unlock()

	h.writeJSON(w, http.StatusOK, map[string]string{"token": token})
}
