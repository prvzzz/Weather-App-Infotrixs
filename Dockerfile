# Use Node base image
FROM node:18-alpine

# Set working dir
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Build app (if React/Vite/etc)
RUN npm run build || true

# Expose port (adjust if needed)
EXPOSE 3000

# Start app
CMD ["npm", "start"]
