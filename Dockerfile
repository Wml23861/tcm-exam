# Stage 1: 构建前端
FROM node:22-alpine AS frontend-builder
WORKDIR /build
COPY tcm-exam-prep/package*.json ./
RUN npm ci
COPY tcm-exam-prep/ ./
RUN npm run build

# Stage 2: 生产运行环境
FROM node:22-alpine

# better-sqlite3 需要编译工具
RUN apk add --no-cache python3 make g++

WORKDIR /app/server
COPY tcm-exam-prep-server/package*.json ./
RUN npm ci

COPY tcm-exam-prep-server/ .

# 前端构建产物复制到后端期望的路径 (相对 server/src/app.ts 为 ../../tcm-exam-prep/dist)
COPY --from=frontend-builder /build/dist /app/tcm-exam-prep/dist

RUN mkdir -p /app/server/data
VOLUME ["/app/server/data"]

EXPOSE 3002
ENV NODE_ENV=production
CMD ["npx", "tsx", "src/index.ts"]
