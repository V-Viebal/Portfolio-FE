# Stage 1: Build Stage (Node.js)
FROM node:22 AS build-web
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=8192
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY . .
RUN npm install

# Build the application (SSR and Prerender)
RUN npm run build:ssr:production && npm run prerender:production

# Stage 2: Production Stage for Unified Node.js and Nginx Container
FROM alpine:3.18

# Install necessary runtime dependencies
RUN apk add --no-cache pcre zlib openssl libstdc++ nginx nodejs npm

# Set up directories and permissions
RUN mkdir -p /var/lib/nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/lib/nginx

# Copy built application files from the build stage
COPY --from=build-web /app/dist/production/browser /usr/share/nginx/html
COPY --from=build-web /app/dist/production/server /app/dist/production/server
COPY --from=build-web /app/package.json /app/

# Install production dependencies for Node.js server
WORKDIR /app
RUN npm install --only=production

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx and 4000 for Node.js
EXPOSE 80 4000

# Run both Nginx and Node.js server
CMD ["/bin/sh", "-c", "nginx && node /app/dist/production/server/main.js"]
