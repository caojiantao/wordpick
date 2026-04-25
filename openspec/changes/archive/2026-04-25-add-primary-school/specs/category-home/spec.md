## ADDED Requirements

### Requirement: 从 API 动态加载分类列表

The system SHALL fetch categories from `GET /wp/categories` and display them as a list, ordered by `sort` ascending. No static category constants SHALL be used.

首页分类列表须完全来自后端接口，按 `sort` 升序展示每个分类名称，不依赖任何本地常量文件。

#### Scenario: 正常加载分类

- **WHEN** 学习者打开首页
- **THEN** 系统请求 `GET /wp/categories` 并展示返回的分类列表

#### Scenario: 进入某一分类

- **WHEN** 学习者点选某一分类
- **THEN** 系统跳转至该分类的章节列表页 `/chapters/:categoryId`

#### Scenario: 接口请求失败

- **WHEN** `GET /wp/categories` 返回非 2xx 或网络超时
- **THEN** 系统显示错误提示，不展示空列表也不崩溃

#### Scenario: 不经过强制引导

- **WHEN** 学习者打开根路径
- **THEN** 系统直接展示分类列表，无强制登录或引导页
