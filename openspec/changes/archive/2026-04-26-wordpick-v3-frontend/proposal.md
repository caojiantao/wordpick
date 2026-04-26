## Why

拾词 v2 仅支持匿名浏览词库，用户无法记录学习状态；v3 后端已上线单词标记能力，前端引入复习模式（翻转卡片 + 认识/不认识判断）和生词本，形成「学习 → 复习 → 生词本」的完整闭环。

## What Changes

- **新增** 未登录拦截：任意接口返回 `code === -2` 时跳转 SSO 登录页，携带 `redirectUrl`
- **新增** 复习模式：章节列表每章旁加「复习」入口，进入翻转卡片流程；判断不认识自动加入生词本
- **新增** 底部 tabbar：词库 / 生词本 两个 tab
- **新增** 生词本页：展示不认识的词列表，进入复习模式
- **移除** WordCardsView 中的「认识」「不认识」按钮（学习模式纯浏览，不做判断）

## Capabilities

### New Capabilities

- `user-login`: 未登录拦截，检测 code=-2 跳转 SSO 登录页
- `review`: 复习模式，翻转卡片流程，判断认识/不认识，不认识自动加入生词本
- `word-book`: 生词本页，按类别展示不认识的词，进入复习模式

### Modified Capabilities

- `word-cards`: 移除「认识」「不认识」按钮，恢复纯学习浏览模式
- `chapter-list`: 每章新增「复习」入口

## Impact

- **新增文件**：`WordBookView.vue`、`ReviewView.vue`
- **修改文件**：`WordCardsView.vue`（移除标记按钮）、`ChapterListView.vue`（新增复习入口）、`router/index.js`、`App.vue`（底部 tabbar）
- **新增 API 调用**：`POST /wp/word/saveMark`、`GET /wp/word/listMark`
- **依赖**：后端 Cookie 鉴权，未登录时跳转登录页
