FROM node:22-alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN mkdir -p /app/data
VOLUME ["/app/data"]

EXPOSE 3002
ENV NODE_ENV=production
CMD ["npx", "tsx", "src/index.ts"]
