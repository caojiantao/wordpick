## MODIFIED Requirements

### Requirement: 左右滑动浏览单词卡片

The system SHALL fetch all words for the chapter from `GET /wp/words?chapterId=<id>`, ordered by `sort` ascending, and present them as a horizontally swipeable card deck using `van-swipe`. Each card displays the complete word entry. The navigation bar SHALL show current position as `当前序号 / 总数`. 学习模式为纯浏览，不含认识/不认识按钮。

每章单词一次性加载，以 `van-swipe` 横向滑动展示，导航栏显示当前进度（如 `3 / 20`）。

#### Scenario: 正常加载并展示第一张卡片

- **WHEN** 学习者进入 `/cards/:chapterId`
- **THEN** 系统加载全章单词并展示第一张卡片，导航栏显示 `1 / N`，无标记按钮

#### Scenario: 左右滑动切换单词

- **WHEN** 学习者向左或向右滑动
- **THEN** 系统切换到下一张或上一张卡片，导航栏进度随之更新

#### Scenario: 接口请求失败

- **WHEN** `GET /wp/words` 返回非 2xx 或网络超时
- **THEN** 系统显示错误提示，不崩溃
