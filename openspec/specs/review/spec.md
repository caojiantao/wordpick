# review Specification

## Purpose
TBD - created by archiving change wordpick-v3-frontend. Update Purpose after archive.
## Requirements
### Requirement: 复习入口
The system SHALL display a 复习 button alongside each chapter in the chapter list. Tapping it enters review mode for that chapter.

#### Scenario: 进入章节复习
- **WHEN** 用户点击章节旁的「复习」按钮
- **THEN** 系统跳转至该章节的复习页

### Requirement: 翻转卡片复习流程
The system SHALL present each word as a flip card: initially showing only the headword. The user taps to reveal the full entry (phonetics, senses, examples), then judges 认识 or 不认识.

#### Scenario: 初始只展示单词
- **WHEN** 用户进入复习页，看到某张卡片
- **THEN** 系统只展示单词，遮住释义和例句

#### Scenario: 点击翻转展示释义
- **WHEN** 用户点击卡片或「显示答案」按钮
- **THEN** 系统展示完整词条（音标、释义、例句）并出现「认识」「不认识」按钮

#### Scenario: 标记不认识
- **WHEN** 用户点击「不认识」
- **THEN** 系统调用 `POST /wp/word/saveMark`（state=1），toast 提示「已加入生词本」，滑到下一张

#### Scenario: 标记认识
- **WHEN** 用户点击「认识」
- **THEN** 系统调用 `POST /wp/word/saveMark`（state=2），toast 提示「太棒了！」，滑到下一张

### Requirement: 生词本进入复习
The system SHALL allow users to enter review mode from the word-book page, using the unfamiliar word list as the review set.

#### Scenario: 从生词本进入复习
- **WHEN** 用户在生词本点击某个单词
- **THEN** 系统进入复习模式，以该类别的生词列表为复习集，定位到该词

