## Context

v3 的 WordCardsView 用 van-swipe 实现纯浏览，用户可以随意左右滑，没有完成状态。ReviewView 和 WordBookView 作为独立模块叠加在词库之上，但生词本和复习模式的边界模糊，整体流程冗余。

v4 目标：词库 → 章节 → 学习，一条线走完，学习交互本身保证掌握。

## Goals / Non-Goals

**Goals:**
- 学习交互改为动态队列，不认识的词反复出现直到认识
- 删除 ReviewView、WordBookView 及相关路由
- 去掉 tabbar，简化导航层级

**Non-Goals:**
- 不引入每日计划、新词/复习比例
- 不做艾宾浩斯或 AI 记忆曲线
- 不保留生词本数据写入（saveMark 接口暂停使用）

## Decisions

### 用动态数组替代 van-swipe

van-swipe 是固定顺序，无法支持动态追加。

改为维护一个 `queue: Ref<Word[]>`，当前展示 `queue[0]`，认识则 `shift()`，不认识则 `shift()` 后再 `push()` 到末尾。不需要滑动手势，改为按钮点击驱动翻页。

### 卡片合并为一页，分两个阶段

不拆成两个页面，原因：无论认识还是不认识，详情展示完全相同，分页没有额外收益。

- **盲测阶段**（`revealed = false`）：显示单词 + 音标，底部「认识」/「不认识」两个按钮
- **详情阶段**（`revealed = true`）：展开释义 + 例句，底部变为单个「下一个」按钮

用户点「认识」/「不认识」时同步记录结果并切换到详情阶段，点「下一个」时执行队列操作（认识→shift，不认识→shift+push）并重置到下一张的盲测阶段。

### 文件与路由重命名

`WordCardsView.vue` 语义是"卡片浏览"，v4 实际是学习交互，重命名为 `WordLearnView.vue`，路由从 `/cards/:chapterId` 改为 `/learn/:chapterId`，路由名从 `word-cards` 改为 `word-learn`。

ChapterListView 中跳转链接同步更新。

### 删除文件而非重构

ReviewView.vue、WordBookView.vue 直接删除，不做渐进迁移，因为 v4 是破坏性变更，路由也一并清理。

## Risks / Trade-offs

- [队列循环风险] 如果用户一直点不认识，队列永不结束 → 可接受，这是设计意图，用户需要认识才能完成
- [进度丢失] 刷新页面后队列重置，从头开始 → 可接受，章节单次学习不需要持久化进度

## Migration Plan

1. 删除 `ReviewView.vue`、`WordBookView.vue`
2. 重写 `WordCardsView.vue`（动态队列逻辑）
3. 清理 `router/index.js`（删除 review、wordbook 路由）
4. 清理 `App.vue`（删除 tabbar）
5. `wpApi.js` 保留 saveMark/listMark 接口定义，暂不调用
