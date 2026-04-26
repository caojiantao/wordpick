## ADDED Requirements

### Requirement: 动态队列学习模式

The system SHALL load all words for the chapter and present them as a dynamic queue. Each round, only the headword and phonetic are shown first; the user SHALL judge 认识 or 不认识 before seeing full details.

- 认识：展示完整词条详情，该词从队列移除
- 不认识：展示完整词条详情，该词追加到队列末尾
- 全部词都被判断为认识后，进入完成状态

#### Scenario: 进入学习页

- **WHEN** 学习者进入章节学习
- **THEN** 系统加载全章单词，展示第一张卡片（仅显示单词+音标），导航栏显示 `1 / N`（N 为初始总词数）

#### Scenario: 判断认识

- **WHEN** 学习者点击「认识」
- **THEN** 系统展示该词完整详情，并自动前进到下一张；该词不再出现

#### Scenario: 判断不认识

- **WHEN** 学习者点击「不认识」
- **THEN** 系统展示该词完整详情，并自动前进到下一张；该词追加到队列末尾，稍后再考

#### Scenario: 全部认识后完成

- **WHEN** 队列中最后一个词被判断为认识
- **THEN** 系统显示完成提示（如"本章学完！"），不再出现新词

#### Scenario: 接口请求失败

- **WHEN** `GET /wp/words` 返回非 2xx 或网络超时
- **THEN** 系统显示错误提示，不崩溃

### Requirement: 卡片展示完整词条

The system SHALL display the complete word entry after the user makes a judgment. Content includes: headword, phonetic_us and phonetic_uk when non-empty, all senses with pos and meaning, and all examples with sentence and translation when non-empty.

#### Scenario: 展示音标

- **WHEN** phonetic_us 或 phonetic_uk 有非空值
- **THEN** 系统展示对应一侧或两侧音标，空值一侧不显示

#### Scenario: 展示例句

- **WHEN** 该词条 examples 数组非空
- **THEN** 系统在词义下方展示所有例句及中文译文

#### Scenario: 无例句时不留占位

- **WHEN** 该词条 examples 为空
- **THEN** 系统不渲染例句区块

### Requirement: 返回章节列表

The system SHALL allow navigation back to the chapter list.

#### Scenario: 从学习页返回

- **WHEN** 学习者执行「返回」
- **THEN** 系统回到对应章节列表页
