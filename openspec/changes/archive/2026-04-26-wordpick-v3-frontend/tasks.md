## 1. API 层

- [ ] 1.1 wpApi.js 新增 saveMark、listMark 接口封装
- [ ] 1.2 wpApi.js 公共请求方法检测 code === -2，跳转 SSO 登录页（携带 redirectUrl）

## 2. 底部 tabbar

- [ ] 2.1 App.vue 新增 van-tabbar（词库 / 生词本），仅首页和生词本页显示

## 3. 学习模式调整

- [ ] 3.1 WordCardsView.vue 移除「认识」「不认识」按钮，恢复纯浏览

## 4. 复习模式

- [ ] 4.1 新增 ReviewView.vue：翻转卡片，先只展单词，点击展开释义，出现认识/不认识按钮
- [ ] 4.2 标记后 fire-and-forget 调 saveMark，toast 提示，自动滑到下一张
- [ ] 4.3 ChapterListView.vue 每章新增「复习」入口，跳转 /review/:chapterId
- [ ] 4.4 router/index.js 新增 /review/:chapterId 路由

## 5. 生词本

- [ ] 5.1 新增 WordBookView.vue：类别筛选 + 词列表，点击进入复习模式
- [ ] 5.2 router/index.js 新增 /wordbook 路由
- [ ] 5.3 WordBookView 点击词跳转 ReviewView，传入词列表和初始 index
