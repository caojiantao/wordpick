## Why

后端已上线小学英语词库（38章、661词）。前端 v1 依赖静态 JSON 词表，架构已不适用；借此机会整体切换为后端驱动，废弃所有静态数据和旧视图，重新实现三层导航（分类→章节→单词卡片）。

## What Changes

- **删除**：`WordListView`、`WordDetailView`、`constants/categories.js`、`src/services/wordData.js`、`dist/data/` 静态词表
- **重写** `HomeView`：分类数据全部来自 `GET /wp/categories`，不再读本地常量
- **新增** `ChapterListView`：`/chapters/:categoryId`，章节数据来自 `GET /wp/chapters?categoryId=`
- **新增** `WordCardsView`：`/cards/:chapterId`，单词数据来自 `GET /wp/words?chapterId=`，以 `van-swipe` 左右滑动浏览每张单词卡片
- **新增** `src/services/wpApi.js`：统一封装后端三个接口，含内存缓存

## Capabilities

### New Capabilities

- `category-home`: 首页从 API 动态加载分类列表
- `chapter-list`: 章节列表页，展示选定分类的所有章节
- `word-cards`: 单词卡片页，支持左右滑动浏览整章单词，每张卡片展示词形、音标、词义、例句

### Modified Capabilities

（无——旧能力全部废弃替换，不做增量修改）

## Impact

- **删除文件**：`WordListView.vue`、`WordDetailView.vue`、`constants/categories.js`、`services/wordData.js`
- **新增文件**：`ChapterListView.vue`、`WordCardsView.vue`、`services/wpApi.js`
- **修改文件**：`HomeView.vue`（重写）、`router/index.js`（路由表重建）、`vite.config.js`（dev proxy）
- **后端 API 依赖**：`GET /wp/categories`、`GET /wp/chapters?categoryId=`、`GET /wp/words?chapterId=`
