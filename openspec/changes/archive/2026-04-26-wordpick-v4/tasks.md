## 1. 清理旧代码

- [ ] 1.1 删除 `src/views/ReviewView.vue`
- [ ] 1.2 删除 `src/views/WordBookView.vue`
- [ ] 1.3 删除 `src/views/WordCardsView.vue`
- [ ] 1.4 清理 `src/router/index.js`：删除 word-cards、review-chapter、review-wordbook、word-book 路由
- [ ] 1.5 清理 `src/App.vue`：删除 tabbar 及相关逻辑

## 2. 新建 WordLearnView

- [ ] 2.1 新建 `src/views/WordLearnView.vue`，加载章节单词列表
- [ ] 2.2 实现动态队列逻辑：认识→shift，不认识→shift+push
- [ ] 2.3 实现盲测阶段：显示单词 + 音标 + 「认识」/「不认识」按钮
- [ ] 2.4 实现详情阶段：展示释义 + 例句 + 「下一个」按钮
- [ ] 2.5 实现完成状态：队列清空后显示「本章学完！」提示
- [ ] 2.6 实现导航栏进度显示（基于初始总词数）

## 3. 路由与跳转

- [ ] 3.1 在 `router/index.js` 新增 `/learn/:chapterId` 路由，名称 `word-learn`
- [ ] 3.2 更新 `ChapterListView.vue`：章节点击跳转改为 `word-learn` 路由，删除「复习」按钮
