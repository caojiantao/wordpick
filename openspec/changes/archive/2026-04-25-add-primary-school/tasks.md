## 1. 清理旧代码

- [ ] 1.1 删除 `src/views/WordListView.vue`
- [ ] 1.2 删除 `src/views/WordDetailView.vue`
- [ ] 1.3 删除 `src/constants/categories.js`
- [ ] 1.4 删除 `src/services/wordData.js`

## 2. API 服务层

- [ ] 2.1 新建 `src/services/wpApi.js`，封装 `getCategories()`、`getChapters(categoryId)`、`getWords(chapterId)`，含 Map 内存缓存
- [ ] 2.2 在 `vite.config.js` 添加 `/wp` dev proxy，指向 `VITE_WP_BASE_URL`

## 3. 路由重建

- [ ] 3.1 重写 `src/router/index.js`：仅保留三条路由 `/`、`/chapters/:categoryId`、`/cards/:chapterId`

## 4. HomeView 重写

- [ ] 4.1 重写 `src/views/HomeView.vue`：调用 `getCategories()` 加载分类，`van-cell-group` 展示列表，含加载和错误状态

## 5. ChapterListView 新增

- [ ] 5.1 新建 `src/views/ChapterListView.vue`：调用 `getChapters(categoryId)` 加载章节列表，含加载和错误状态，点击跳转 `/cards/:chapterId`，返回回首页

## 6. WordCardsView 新增

- [ ] 6.1 新建 `src/views/WordCardsView.vue`：调用 `getWords(chapterId)` 加载单词，`van-swipe` 展示卡片，导航栏显示 `当前 / 总数`
- [ ] 6.2 实现单词卡片内容：词形（大字）、美英音标（条件展示）、词义列表（pos + meaning）、例句列表（sentence + translation，无例句不渲染）
- [ ] 6.3 实现加载和错误状态

## 7. 验证

- [ ] 7.1 首页显示后端返回的分类列表
- [ ] 7.2 进入章节列表，显示全部章节
- [ ] 7.3 进入某章，左右滑动浏览所有单词卡片，进度显示正确
- [ ] 7.4 有例句的词条正常展示例句，无例句的不留空块
- [ ] 7.5 各层返回导航正确
