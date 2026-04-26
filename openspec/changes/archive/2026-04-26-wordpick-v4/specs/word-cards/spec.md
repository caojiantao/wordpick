## MODIFIED Requirements

### Requirement: 左右滑动浏览单词卡片
The word-cards module SHALL NOT use swipe-based browsing in v4. It is replaced by the dynamic queue learning mode (word-learn).

#### Scenario: 旧卡片浏览已移除
- **WHEN** 用户进入章节学习
- **THEN** 系统使用动态队列学习模式，不再使用 van-swipe 横向滑动

## REMOVED Requirements

### Requirement: 卡片展示完整词条
**Reason**: 合并到 word-learn spec
**Migration**: 参见 word-learn spec

### Requirement: 返回章节列表
**Reason**: 合并到 word-learn spec
**Migration**: 参见 word-learn spec
