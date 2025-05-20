FROM node:18-alpine

WORKDIR /app

# Copy the entire source code
COPY . .

# Install dependencies
RUN npm ci

# Set build-time environment variables for Vite
# These will be baked into the frontend during build
ARG VITE_API_BASE_URL
ARG VITE_FE_BASE_URL

# Provide fallback values (optional)
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-http://localhost:8080/api}
ENV VITE_FE_BASE_URL=${VITE_FE_BASE_URL:-http://localhost:5173/}

# Build the Vite app with the correct env vars
RUN VITE_API_BASE_URL=$VITE_API_BASE_URL VITE_FE_BASE_URL=$VITE_FE_BASE_URL npm run build

# Expose port for dev server (if using dev:docker)
EXPOSE 5173

# Run Vite dev server (development mode)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
