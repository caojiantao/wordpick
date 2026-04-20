# word-detail Specification

## Purpose
定义词条详情页的字段展示规则，以及基于浏览器历史记录的返回语义。

## Requirements
### Requirement: 展示完整词条

The system SHALL display the full entry for the selected word, including the headword, both `phonetics.us` and `phonetics.uk` when non-empty, and all `senses` with their `pos` and `meaning` fields.

详情页须展示 `word`；`phonetics.us` 与 `phonetics.uk` 有值则展示，无则不可留假占位误导；`senses` 中每条须展示词性 `pos` 与中文义 `meaning`。

#### Scenario: 仅一侧有音标

- **When** 当前词条仅 `phonetics.us` 或仅 `phonetics.uk` 有非空字符串
- **Then** 系统只展示有值的一侧，不将空侧显示为有效音标

#### Scenario: 存在上一页时执行回退

- **When** 学习者从应用内其它页面进入词条详情，并在详情页执行「返回」或等价导航
- **Then** 系统返回到浏览器历史中的上一页

#### Scenario: 直接访问详情链接时不强制跳转

- **When** 学习者直接访问词条详情链接，且当前会话中不存在应用内上一页
- **Then** 系统不应因为点击「返回」而强制跳转到首页或任意分类列表
