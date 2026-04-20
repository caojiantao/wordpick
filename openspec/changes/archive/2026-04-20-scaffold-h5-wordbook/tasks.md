## 1. 工程与构建

- [x] 1.1 初始化 Vue 3 + Vite 项目（JavaScript 或 TypeScript 按仓库惯例）；`package.json` 的 `name` 使用 **`wordpick`**
- [x] 1.1a 安装 **Vant 4**（`vant`）并配置**按需引入**；三屏页面使用其导航、列表等移动组件
- [x] 1.2 配置 `public`/`base`，确保 `data/*.json` 在构建后可被按需请求（运行时通过 `public/data` 与 `import.meta.env.BASE_URL` 访问）
- [x] 1.3 添加基础路由（Vue Router）：首页、类别列表、词条详情

## 2. 页面与数据

- [x] 2.1 实现首页：七个类别入口，映射至七份 JSON
- [x] 2.2 实现类别词列表：仅显示 `word`，可滚动；进入详情
- [x] 2.3 实现词条详情：展示 `word`、`phonetics.us`、`phonetics.uk`（空则隐藏）、全部 `senses`

## 3. 自建部署

- [x] 3.1 文档化构建与在树莓派（或同类主机）上用 Nginx/Caddy 托管 `dist` 的步骤（可放在仓库 README 一节，简短即可）
- [x] 3.2 本地 `npm run build` 验证通过并可打开三屏闭环

## 4. OpenSpec

- [x] 4.1 使用 OpenSpec CLI 校验本变更 `openspec validate scaffold-h5-wordbook`
