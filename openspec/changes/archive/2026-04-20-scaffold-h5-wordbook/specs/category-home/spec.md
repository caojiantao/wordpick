## ADDED Requirements

### Requirement: 七类词库入口

The system SHALL present exactly seven category entry points on the home view, each bound to one of the static word lists: junior, senior, CET4, CET6, post-graduate (kaoyan), TOEFL, and SAT.

首版首页必须提供且仅提供七类入口，并分别对应 `data` 中七份词表（初中、高中、CET4、CET6、考研、托福、SAT）。

#### Scenario: 进入某一类

- **When** 学习者在首页点选某一类别
- **Then** 系统进入该类别下的词列表视图

#### Scenario: 不经过强制引导

- **When** 学习者打开「拾词」根路径
- **Then** 系统直接展示含七类入口的首页，无强制登录或引导页
