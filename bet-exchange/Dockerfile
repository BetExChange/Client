FROM node:18-alpine

WORKDIR /app
COPY package.json .

# Copy the entire source code
COPY . .
RUN npm ci

# Expose port for dev server (if using dev:docker)
EXPOSE 5173

# Run Vite dev server (development mode)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
