## Why

v3 的学习模式是纯浏览卡片，没有认知判断，用户没有明确的"学完"概念。参考扇贝单词核心设计，改为动态队列翻牌——不认识的词反复出现直到认识，学完即掌握，不需要额外的生词本和复习模式。

## What Changes

- **BREAKING** `word-cards`（学习模式）：从纯 swipe 浏览改为动态队列模式——先只显示单词+音标，用户判断认识/不认识；不认识的词追加到队列末尾，直到全部认识才算学完
- **BREAKING** `review`（复习模式）：删除，不再需要
- **BREAKING** `word-book`（生词本）：删除，学习交互本身保证掌握，生词本无额外价值
- **BREAKING** tabbar：删除，只剩词库一条线，不需要底部导航

## Capabilities

### New Capabilities
- `word-learn`: 动态队列学习模式——先显示单词+音标，用户判断认识/不认识；不认识追加到队列末尾，全部认识后显示完成

### Modified Capabilities
- `word-cards`: 原纯浏览卡片，由 word-learn 替代

## Impact

- 前端：删除 `ReviewView.vue`、`WordBookView.vue`，重写 `WordCardsView.vue`
- 路由：删除 `/review/*`、`/wordbook` 路由
- App.vue：去掉 tabbar
- 后端：删除 `saveMark` / `listMark` 接口，`wp_user_word_mark` 表暂不使用
