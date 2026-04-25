# word-cards Specification

## Purpose
TBD - created by archiving change add-primary-school. Update Purpose after archive.
## Requirements
### Requirement: 左右滑动浏览单词卡片

The system SHALL fetch all words for the chapter from `GET /wp/words?chapterId=<id>`, ordered by `sort` ascending, and present them as a horizontally swipeable card deck using `van-swipe`. Each card displays the complete word entry. The navigation bar SHALL show current position as `当前序号 / 总数`.

每章单词一次性加载，以 `van-swipe` 横向滑动展示，导航栏显示当前进度（如 `3 / 20`）。

#### Scenario: 正常加载并展示第一张卡片

- **WHEN** 学习者进入 `/cards/:chapterId`
- **THEN** 系统加载全章单词并展示第一张卡片，导航栏显示 `1 / N`

#### Scenario: 左右滑动切换单词

- **WHEN** 学习者向左或向右滑动
- **THEN** 系统切换到下一张或上一张卡片，导航栏进度随之更新

#### Scenario: 接口请求失败

- **WHEN** `GET /wp/words` 返回非 2xx 或网络超时
- **THEN** 系统显示错误提示，不崩溃

### Requirement: 卡片展示完整词条

The system SHALL display on each card: the headword, `phonetic_us` and `phonetic_uk` when non-empty, all senses with `pos` and `meaning`, and all examples with `sentence` and `translation` when the examples array is non-empty.

#### Scenario: 展示音标

- **WHEN** `phonetic_us` 或 `phonetic_uk` 有非空值
- **THEN** 系统展示对应一侧或两侧音标，空值一侧不显示

#### Scenario: 展示例句

- **WHEN** 该词条 `examples` 数组非空
- **THEN** 系统在词义下方展示所有例句及中文译文

#### Scenario: 无例句时不留占位

- **WHEN** 该词条 `examples` 为空
- **THEN** 系统不渲染例句区块

### Requirement: 返回章节列表

The system SHALL allow navigation back to the chapter list.

#### Scenario: 从单词卡片页返回

- **WHEN** 学习者执行「返回」
- **THEN** 系统回到对应章节列表页

