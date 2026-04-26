## Context

wordpick v2 已完成后端驱动的三层导航（分类→章节→单词卡片），但无登录态，所有接口匿名可访问。v3 后端新增了 `/wp/word/saveMark` 和 `/wp/word/listMark` 两个需要登录的接口，前端需要同步引入鉴权机制、标记交互和生词本页面。

## Goals / Non-Goals

**Goals:**
- 前置登录，未登录跳转 `/login`
- 滑卡新增「认识」「不认识」按钮，实时调用标记接口
- 底部 tabbar（词库 / 生词本）
- 生词本页按类别筛选，展示不认识的词滑卡

**Non-Goals:**
- 不做用户注册，邀请制入库
- 不做标记状态的本地持久化（直接调接口）
- 不做测验功能（v3 从简）

## Decisions

**1. 登录态管理用 Cookie，不引入 Pinia/Vuex**

后端已通过 Cookie（token + user_id）维护登录态，前端无需额外存储，路由守卫调一个轻量接口（如 `/home/getHomeExtraResp`）探测登录状态即可。

**2. 路由守卫统一拦截**

在 `router/index.js` 的 `beforeEach` 中判断登录态，未登录跳 `/login`，登录页访问已登录时跳首页。

**3. 底部 tabbar 用 van-tabbar**

Vant 已引入，`van-tabbar` 放在 `App.vue`，仅在非登录页显示。

**4. 生词本页复用 WordCardsView**

`/wordbook/cards` 路由传入 wordIds（或直接传 categoryId+state），WordCardsView 通过 props 区分来源：章节模式走 `/wp/words`，生词本模式走 `/wp/word/listMark`。

**5. 标记按钮不阻塞滑动**

调用 saveMark 为异步触发（fire-and-forget），不等待接口返回，不影响滑卡体验。

## Risks / Trade-offs

- [Cookie 跨域] 本地开发 Vite proxy 已配置，生产环境后端 Cookie domain 需与前端域名一致 → 已在后端 LoginYml 配置
- [fire-and-forget] 网络异常时标记静默失败 → 当前阶段可接受，后续可加重试

## 新增路由

```
/login                     LoginView（不需要登录）
/wordbook                  WordBookView（需要登录）
/wordbook/cards/:categoryId WordCardsView 生词本模式（需要登录）
```
