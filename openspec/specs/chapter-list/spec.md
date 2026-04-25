# chapter-list Specification

## Purpose
TBD - created by archiving change add-primary-school. Update Purpose after archive.
## Requirements
### Requirement: 展示章节列表

The system SHALL fetch chapters from `GET /wp/chapters?categoryId=<id>` and display them ordered by `sort` ascending, one chapter per row showing the chapter name.

#### Scenario: 正常加载章节

- **WHEN** 学习者进入 `/chapters/:categoryId`
- **THEN** 系统展示该分类下全部章节，按序排列，每行显示章节名称

#### Scenario: 进入某一章节

- **WHEN** 学习者点选某一章节
- **THEN** 系统跳转至该章节的单词卡片页 `/cards/:chapterId`

#### Scenario: 接口请求失败

- **WHEN** `GET /wp/chapters` 返回非 2xx 或网络超时
- **THEN** 系统显示错误提示，不崩溃

### Requirement: 返回首页

The system SHALL allow navigation back to the home view.

#### Scenario: 从章节列表返回

- **WHEN** 学习者执行「返回」
- **THEN** 系统回到首页分类列表

