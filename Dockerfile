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

# Brotli compression for production assets
COPY compress.js .
RUN node compress.js

# Stage 2: Build Nginx with Brotli Support
FROM alpine:3.18 AS build-nginx

# Install build dependencies for Nginx
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    pcre-dev \
    zlib-dev \
    openssl-dev \
    wget \
    brotli-dev \
    git

# Install runtime dependencies
RUN apk add --no-cache \
    pcre \
    zlib \
    openssl

# Download Nginx and Brotli module source code
WORKDIR /usr/src
RUN wget http://nginx.org/download/nginx-1.24.0.tar.gz && \
    tar zxvf nginx-1.24.0.tar.gz && \
    git clone https://github.com/google/ngx_brotli.git && \
    cd ngx_brotli && git submodule update --init

# Compile Nginx with Brotli support
WORKDIR /usr/src/nginx-1.24.0
RUN ./configure --with-compat --add-dynamic-module=../ngx_brotli && \
    make && make install

# Stage 3: Production Stage for Unified Node.js and Nginx Container
FROM alpine:3.18

# Install necessary runtime dependencies
RUN apk add --no-cache pcre zlib openssl brotli libstdc++ nginx nodejs npm

# Set up directories and permissions
RUN mkdir -p /var/lib/nginx /usr/share/nginx/html /etc/nginx/modules && \
    chown -R nginx:nginx /var/lib/nginx

# Copy Brotli module from the build stage
COPY --from=build-nginx /usr/src/nginx-1.24.0/objs/ngx_http_brotli_filter_module.so /etc/nginx/modules/
COPY --from=build-nginx /usr/src/nginx-1.24.0/objs/ngx_http_brotli_static_module.so /etc/nginx/modules/

# Copy built application files from the build stage
COPY --from=build-web /app/dist/compressed/browser /usr/share/nginx/html
COPY --from=build-web /app/dist/production/server /app/dist/production/server
COPY --from=build-web /app/package.json /app/

# Install production dependencies for Node.js server
WORKDIR /app
RUN npm install --only=production

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Run both Nginx and Node.js server
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & node /app/dist/production/server/main.js"]
