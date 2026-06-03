---
name: 部署配置
description: 生产环境Docker部署：Dockerfile、docker-compose、Nginx、SSL
type: project
---

# 生产部署

## 部署文件

| 文件 | 用途 |
|------|------|
| `Dockerfile` (根) | 多阶段构建：编译前端 → 打包后端+dist |
| `docker-compose.prod.yml` | app + nginx + certbot 三服务编排 |
| `nginx/nginx.conf` | 反向代理 + HTTPS + 安全头 |
| `.env.production.example` | 生产环境变量模板 |
| `DEPLOY.md` | 详细部署指南 |

## 架构

```
用户 → HTTPS(443) → Nginx → 应用容器(:3002)
                    ↓
                  Certbot (SSL自动续签)
```

## 关键配置

- 应用端口: 3002
- 数据库: SQLite (挂载 volume `/app/server/data`)
- AI: DeepSeek API (国内直连，无需翻墙)
- SSL: Let's Encrypt 免费证书，certbot 自动续签
- 大文件上传: Nginx client_max_body_size 100M

## 部署平台推荐

- 腾讯云轻量应用服务器 2核2G (~112元/年)
- 或阿里云 ECS 2核2G (~120元/年)
- 需域名 + ICP备案 (约15-20工作日)

## 费用

约 162元/年 (服务器 + 域名, SSL免费, DeepSeek免费额度)
