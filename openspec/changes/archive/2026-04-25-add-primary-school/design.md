## Context

前端 v1 采用静态 JSON 驱动（`lexicon.json` + `lists/<id>.json`），路由为两层扁平结构。后端已提供完整 RESTful API，本次做整体架构切换：数据全走后端，路由重建为三层，旧视图全部删除。

## Goals / Non-Goals

**Goals:**
- HomeView 从 `GET /wp/categories` 动态加载分类
- ChapterListView 从 `GET /wp/chapters` 加载章节列表
- WordCardsView 从 `GET /wp/words` 加载单词，用 `van-swipe` 左右滑动浏览
- 单词卡片展示完整词条：词形 + 美英音标 + 词义 + 例句
- 旧静态数据文件、旧视图全部删除

**Non-Goals:**
- 不做用户系统、学习进度持久化
- 不做分页（每章最多 25 词，一次性加载）
- 不把卡片位置编入 URL（`/cards/:chapterId` 固定，index 由组件内部管理）

## Decisions

**1. 路由结构：三层扁平**
```
/                        HomeView
/chapters/:categoryId    ChapterListView
/cards/:chapterId        WordCardsView
```
不嵌套路由，每层独立视图，back 行为用 `router.back()` 自然回退。

**2. 单词浏览用 `van-swipe`，不做独立详情页**
每张 Swipe 卡片即为完整词条详情，导航栏显示 `当前 / 总数`。避免了「列表 → 详情」的两次跳转，更符合单词卡片的学习场景。

**3. API 层统一封装在 `wpApi.js`，含简单内存缓存**
同一 session 内同一接口参数不重复请求，切回章节列表时无闪烁。

**4. dev proxy 通过 Vite 配置，base URL 走环境变量**
`VITE_WP_BASE_URL` 控制后端地址，本地 `/wp` 路径代理到后端，生产环境由 nginx 反代处理跨域。

## Risks / Trade-offs

- **van-swipe 预加载**：整章单词一次性拉取并渲染全部 slide，章节最多 25 词，无性能问题。
- **后端跨域**：dev 阶段 Vite proxy 解决；生产需后端配置 CORS 或 nginx 同源代理。
