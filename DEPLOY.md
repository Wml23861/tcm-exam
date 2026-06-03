# 岐黄备考系统 — 生产部署指南

四种部署方案，根据需求选择。

| 方案 | 价格 | 需要翻墙 | 复杂度 | 适用场景 |
|------|------|----------|--------|----------|
| **Vercel + Railway** (推荐) | $5/月 | 是 | 低 | 已有 Vercel 账号，前端免费 CDN |
| **Railway 单容器** | $5/月 | 是 | 最低 | 一个平台搞定全部 |
| **Render** | 免费 | 是 | 低 | 省钱，不介意偶尔慢几秒 |
| **自建 VPS** | ~18元/月 | 否 | 中等 | 国内直连，已有服务器 |

---

## 方案一：Vercel（前端）+ Railway（后端）— 推荐

你已有 Vercel 账号，用这个方式最合适：
- 前端部署到 Vercel（免费，全球 CDN，自动 HTTPS）
- 后端部署到 Railway（$5/月，运行 Express + SQLite）
- 前端通过 `VITE_API_BASE` 环境变量指向后端地址

### Step 1: 先部署后端到 Railway

按下面的「Railway 后端部署」步骤，先部署后端并获取地址，例如 `https://tcm-api.up.railway.app`。

### Step 2: 在 Vercel 部署前端

1. 登录 https://vercel.com
2. **Add New Project** → 导入 GitHub 仓库
3. 在项目配置页面设置：

| 配置项 | 值 |
|--------|-----|
| **Root Directory** | `tcm-exam-prep` |
| **Framework Preset** | Vue.js (自动识别 Vite) |
| Build Command | `npm run build`（自动识别） |

4. 展开 **Environment Variables**，添加：

| Key | Value |
|-----|-------|
| `VITE_API_BASE` | `https://tcm-api.up.railway.app`（你后端 Railway 地址） |

5. 点 **Deploy**，等 1-2 分钟构建完成
6. Vercel 分配域名如 `diamond-sutra.vercel.app`，打开即可使用
7. 用 `admin / tcm2024` 登录

### Step 3: 后续更新

```bash
# 推送代码后 Vercel 和 Railway 都会自动重新部署
git push origin main
```

---

## Railway 后端部署（单容器模式，也可用于方案一的后端）

### 前置条件
- 项目已推送到 GitHub 仓库
- 注册 Railway 账号：https://railway.app （GitHub 一键登录）
- 获取 DeepSeek API Key：https://platform.deepseek.com

### Step 1: 创建 Railway 项目

1. 登录 https://railway.app → 点 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 授权并选择你的仓库
4. Railway 自动识别根目录的 `Dockerfile` 和 `railway.json`，开始构建

### Step 2: 挂载持久化卷（保存数据库）

Railway 容器重启会丢失文件，需要给 SQLite 数据库挂载 volume：

1. 在项目页面点 **+ Add Service** → 选 **Volume**
2. Mount Path 填：`/app/server/data`
3. Volume Name 随意填，如 `tcm-db`

### Step 3: 配置环境变量

在项目的 **Variables** 页添加：

| Variable | Value |
|----------|-------|
| `PORT` | `3002` |
| `DB_PATH` | `/app/server/data/tcm-exam.db` |
| `JWT_SECRET` | 随机生成（如点击 Generate） |
| `ALLOW_REGISTRATION` | `true` |
| `AI_API_KEY` | `sk-你的deepseek-key` |
| `AI_API_URL` | `https://api.deepseek.com/v1/chat/completions` |
| `AI_MODEL` | `deepseek-chat` |

### Step 4: 初始化数据库

构建完成后，Railway 会自动部署。然后进入容器执行数据库初始化：

1. 项目页面 → 点进服务 → **Shell** 标签
2. 执行：

```bash
npx knex migrate:latest --knexfile knexfile.ts
npx knex seed:run --knexfile knexfile.ts
```

### Step 5: 访问

- Railway 自动分配域名：`https://xxx.up.railway.app`
- 点 **Settings** → **Domains** → 生成公开 URL
- 浏览器打开，用 `admin / tcm2024` 登录

### Railway 日常维护

```bash
# Railway 自动从 GitHub 主分支拉取更新
git push origin main  # 推送后 Railway 自动重新部署

# SSH 进容器执行命令（Railway Web → Shell）
npx knex migrate:latest --knexfile knexfile.ts   # 数据库迁移
npx knex seed:run --knexfile knexfile.ts           # 导入新数据
```

---

## 方案二：Render（完全免费，有冷启动）

**注意**：免费套餐在 15 分钟无请求后容器会休眠，下次访问需等待 ~30 秒唤醒。

### Step 1: 创建 Web Service

1. 注册 https://render.com （GitHub 登录）
2. New → **Web Service**
3. 关联 GitHub 仓库
4. Render 自动识别 Dockerfile

**配置参数**：

| 参数 | 值 |
|------|-----|
| Name | `tcm-exam` |
| Region | `Singapore` 或 `Oregon` |
| Instance Type | **Free** |
| Health Check Path | `/api/health` |

### Step 2: 磁盘持久化

在服务设置 → **Disks** → 添加：

| 参数 | 值 |
|------|-----|
| Mount Path | `/app/server/data` |
| Size | `1 GB`（免费） |

### Step 3: 环境变量

在 **Environment** 页添加（同 Railway 方案一 Step 3）。

### Step 4: 初始化数据库

部署完成后，用 Render 的 **Shell** 执行：

```bash
npx knex migrate:latest --knexfile knexfile.ts
npx knex seed:run --knexfile knexfile.ts
```

### Step 5: 访问

Render 自动分配 `https://tcm-exam.onrender.com`，打开即可。

**建议**：用 [UptimeRobot](https://uptimerobot.com) 设置每 10 分钟 ping 一次服务，防止冷启动（免费）。

---

## 方案三：自建 VPS（国内直连，无需翻墙）

### 前置准备

1. **云服务器**：腾讯云轻量应用服务器 2核2G（~112元/年）或阿里云 ECS（~120元/年）
2. **域名 + ICP 备案**（国内服务器必需，约 15-20 工作日）
3. **DeepSeek API Key**（AI 功能，国内可直连）

### Step 1: 安装 Docker

```bash
ssh root@你的服务器IP
curl -fsSL https://get.docker.com | bash
apt install -y docker-compose-plugin
```

### Step 2: 上传代码

```bash
# 方式 A: Git 克隆（需先推送到 GitHub/Gitee）
ssh root@你的服务器IP "git clone 仓库地址 /opt/tcm-exam"

# 方式 B: rsync 直接上传
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.vite' \
  --exclude '*.tsbuildinfo' --exclude '*.db' \
  ./ root@你的服务器IP:/opt/tcm-exam/
```

### Step 3: 配置环境

```bash
ssh root@你的服务器IP
cd /opt/tcm-exam
cp .env.production.example .env
nano .env   # 填入实际值
```

### Step 4: 配置域名 + SSL

```bash
# 替换域名
sed -i 's/your-domain.com/你的真实域名/g' nginx/nginx.conf
mkdir -p certbot/conf certbot/www

# 先启 nginx
docker compose -f docker-compose.prod.yml up -d nginx

# 申请证书
docker run --rm \
  -v /opt/tcm-exam/certbot/conf:/etc/letsencrypt \
  -v /opt/tcm-exam/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot -w /var/www/certbot \
  -d 你的真实域名 \
  --email 你的邮箱 \
  --agree-tos --no-eff-email
```

### Step 5: 构建启动

```bash
cd /opt/tcm-exam
docker compose -f docker-compose.prod.yml up -d --build

# 初始化数据库
docker exec tcm-app npx knex migrate:latest --knexfile knexfile.ts
docker exec tcm-app npx knex seed:run --knexfile knexfile.ts
```

### Step 6: 验证

```bash
curl https://你的域名/api/health
# 返回 {"success":true,"data":{"status":"ok"}}
```

### VPS 日常维护

```bash
# 更新代码
cd /opt/tcm-exam && git pull
docker compose -f docker-compose.prod.yml up -d --build
docker exec tcm-app npx knex migrate:latest --knexfile knexfile.ts

# 备份数据库
docker exec tcm-app cp /app/server/data/tcm-exam.db /app/server/data/tcm-exam.db.bak
docker cp tcm-app:/app/server/data/tcm-exam.db.bak ./backup-$(date +%Y%m%d).db

# 查看日志
docker compose -f docker-compose.prod.yml logs -f --tail=100 app
```

---

## 通用前置：推送项目到 GitHub

如果还没推送到 GitHub，先在本地执行：

```bash
cd e:/中医
git remote add origin 你的GitHub仓库地址
git add -A
git commit -m "feat: 添加生产部署配置"
git push -u origin main
```

## 部署后的通用步骤

1. 用 `admin / tcm2024` 登录
2. 设置 → 修改密码
3. 部署完成后如需限制注册，改环境变量 `ALLOW_REGISTRATION=false`

## 费用对比

| 方案 | 费用/年 |
|------|--------|
| Railway | ~$60（约 434 元） |
| Render | 免费（有冷启动） |
| 自建 VPS + 域名 | ~162 元 |
