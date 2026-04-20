# category-word-list Specification

## Purpose
定义分类词列表页的展示方式，以及从首页进入详情和返回首页的基本导航行为。

## Requirements
### Requirement: 按类展示单词列表

The system SHALL list all words for the currently selected category in a single scrollable list, with one word per row, using the `word` field only in each row.

词表须使用当前类别 JSON 数组中的 `word` 依次展示；每行只显示词形，不展示音标与释义。

#### Scenario: 从列表进入详情

- **When** 学习者在词列表中点选某一行
- **Then** 系统进入该词在当类中的词条详情视图

#### Scenario: 返回首页

- **When** 学习者在词列表中执行「返回」或等价导航
- **Then** 系统回到含七类入口的首页
