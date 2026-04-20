# wordpick

`wordpick` 是「拾词」的前端工程，一个基于 Vue 3 + Vite + Vant 的轻量 H5 词书应用。

## 功能范围

- 首页展示七类词库入口
- 按分类浏览单词列表
- 查看词条详情，包括单词、音标和释义

首版不包含账号、收藏、学习进度、搜索和后端服务。

## 本地开发

```bash
npm ci
npm run dev
```

开发和构建前会自动执行 `npm run sync-data`，把 `data/` 下的静态词表同步到 `public/data/`。

## 构建

```bash
npm run build
```

产物输出到 `dist/`。

## 数据说明

- `data/lexicon.json`：词形到完整词条的底表
- `data/lists/*.json`：分类词形列表
- `scripts/build_lexicon.py`：从原始分类全量词条生成底表和列表

## 部署

### 静态托管

构建完成后，将 `dist/` 部署到 Web 服务器目录即可。

当前线上部署目录为 `/var/www/wordpick`。

### Nginx 示例

这是一个前端路由应用，Nginx 需要把未知路径回退到 `index.html`：

```nginx
server {
    listen 1024;
    listen [::]:1024;

    server_name wordpick.caojiantao.site;
    root /var/www/wordpick;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### GitHub Actions

仓库包含 `.github/workflows/ci-cd.yml`。推送到 `main` 后会自动构建并通过 SFTP 同步到服务器。

当前 workflow 只需要一个 GitHub secret：

- `PASSWORD`：部署账户密码
