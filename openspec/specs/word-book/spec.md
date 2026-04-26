# word-book Specification

## Purpose
TBD - created by archiving change wordpick-v3-frontend. Update Purpose after archive.
## Requirements
### Requirement: 底部 tabbar
The system SHALL provide a bottom tabbar with two tabs: 词库 and 生词本, visible on home and word-book pages.

#### Scenario: 切换到生词本
- **WHEN** 用户点击底部「生词本」tab
- **THEN** 系统跳转到生词本页

#### Scenario: 切换回词库
- **WHEN** 用户点击底部「词库」tab
- **THEN** 系统跳转到首页

### Requirement: 生词列表
The system SHALL display a flat list of words marked as 不认识（state=1），each row showing the word only. A category filter at the top allows filtering by category; default shows all categories.

#### Scenario: 默认展示全部生词
- **WHEN** 用户进入生词本页
- **THEN** 系统调用 `GET /wp/word/listMark?state=1`，展示所有类别的不认识词列表，每行仅显示单词

#### Scenario: 按类别筛选
- **WHEN** 用户选择某一类别
- **THEN** 系统调用 `GET /wp/word/listMark?categoryId=&state=1`，刷新列表

#### Scenario: 生词本为空
- **WHEN** 无不认识的词
- **THEN** 系统展示空状态提示，不崩溃

### Requirement: 点击生词进入复习
The system SHALL enter review mode when a word is tapped, using the current filtered word list as the review set, starting at the tapped word's position.

#### Scenario: 点击某词进入复习
- **WHEN** 用户点击列表中某个单词
- **THEN** 系统进入复习模式，定位到该词位置，左右可滑浏览同一生词列表中的其他词

