# wordpick

`wordpick` 是「拾词」的前端工程，一个基于 Vue 3 + Vite + Vant 的轻量 H5 词书应用。

## 功能

- 首页从后端动态加载词库分类
- 按分类浏览章节列表
- 章节内左右滑动浏览单词卡片，每张卡片展示词形、音标、释义和例句

## 本地开发

```bash
npm ci
npm run dev
```

本地开发通过 Vite proxy 将 `/wp` 请求转发到后端，默认地址为 `http://localhost:8080`，可通过环境变量覆盖：

```bash
VITE_WP_BASE_URL=http://your-backend:port npm run dev
```

## 构建

```bash
npm run build
```

生产构建需注入后端地址：

```bash
VITE_WP_BASE_URL=http://api.example.com:1024 npm run build
```

产物输出到 `dist/`。

## 部署

### Nginx 示例

前端路由应用需将未知路径回退到 `index.html`：

```nginx
server {
    listen 80;
    server_name wordpick.caojiantao.site;
    root /var/www/wordpick;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### GitHub Actions

推送到 `main` 后自动构建并通过 SFTP 同步到服务器，所需 secret：

- `PASSWORD`：部署账户密码

`VITE_WP_BASE_URL` 在 workflow 中直接配置，无需设置为 secret。
