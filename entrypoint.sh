#!/bin/sh
set -e

# Wait for Postgres
echo "⏳ Waiting for Postgres at db:5432..."
until pg_isready -h db -p 5432 -U postgres; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "🚀 Postgres is up! Running migrations..."
npm run db:migrate

echo "✅ Starting app..."
exec node dist/server.js
