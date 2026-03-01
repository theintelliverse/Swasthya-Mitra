#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <frontend_url> <backend_url>"
  echo "Example: $0 https://swasthya-mitra.vercel.app https://swasthya-mitra-backend.onrender.com"
  exit 1
fi

FRONTEND_URL="${1%/}"
BACKEND_URL="${2%/}"
HEALTH_URL="$BACKEND_URL/api/health"

echo "[1/3] Checking backend health: $HEALTH_URL"
HEALTH_BODY=$(curl -sS "$HEALTH_URL")
if echo "$HEALTH_BODY" | grep -qi '"status"'; then
  echo "✅ Backend health responded: $HEALTH_BODY"
else
  echo "❌ Backend health did not return expected payload"
  echo "$HEALTH_BODY"
  exit 1
fi

echo "[2/3] Checking CORS allows frontend origin: $FRONTEND_URL"
CORS_HEADERS=$(curl -sS -I -H "Origin: $FRONTEND_URL" "$HEALTH_URL")
if echo "$CORS_HEADERS" | grep -qi "access-control-allow-origin: $FRONTEND_URL"; then
  echo "✅ CORS origin is correctly allowed"
else
  echo "❌ CORS origin header missing or mismatched"
  echo "$CORS_HEADERS"
  echo "Set backend CORS_ORIGIN to include: $FRONTEND_URL"
  exit 1
fi

echo "[3/3] Checking frontend is reachable: $FRONTEND_URL"
FRONT_STATUS=$(curl -sS -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
if [[ "$FRONT_STATUS" == "200" || "$FRONT_STATUS" == "301" || "$FRONT_STATUS" == "302" ]]; then
  echo "✅ Frontend reachable (HTTP $FRONT_STATUS)"
else
  echo "❌ Frontend not reachable (HTTP $FRONT_STATUS)"
  exit 1
fi

echo ""
echo "🎉 Connection verification passed"
echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"
