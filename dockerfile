# -----------------------------
# 1. Build Stage
# -----------------------------
FROM node:20-alpine AS builder


# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy dependency files first (cache-friendly)
COPY package*.json ./

# ✅ Copy drizzle config explicitly (before npm install)
COPY ./drizzle.config.ts ./drizzle.config.ts

# Use npm ci (clean + reliable installs)
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm set fetch-retries 5 \
    && npm set fetch-retry-mintimeout 20000 \
    && npm set fetch-retry-maxtimeout 120000 \
    && npm ci --legacy-peer-deps



# Copy all source files
COPY . .

# Build TypeScript -> dist
RUN npm run build


# -----------------------------
# 2. Production Stage
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# ✅ Copy drizzle config explicitly (before npm install)
COPY ./drizzle.config.ts ./drizzle.config.ts


# Install only production dependencies
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm ci --omit=dev --legacy-peer-deps

# Install pg_isready
RUN apk add --no-cache postgresql-client        

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# 🔹 Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set environment variable for app port
ENV PORT=5000
EXPOSE 5000

# 🔹 Use entrypoint instead of CMD
ENTRYPOINT ["/app/entrypoint.sh"]