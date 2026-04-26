## MODIFIED Requirements

### Requirement: 复习入口
The review module SHALL NOT be accessible in v4. The learning mode (word-learn) guarantees mastery through dynamic queue, making a separate review mode unnecessary.

#### Scenario: 复习入口已移除
- **WHEN** 用户进入章节列表
- **THEN** 系统不显示「复习」按钮，章节点击直接进入学习模式
