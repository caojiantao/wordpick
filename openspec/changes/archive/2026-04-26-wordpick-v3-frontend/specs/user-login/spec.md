## ADDED Requirements

### Requirement: 未登录自动跳转 SSO
The system SHALL detect `code === -2` in any API response and redirect the browser to the SSO login page, appending the current page URL as `redirectUrl`.

#### Scenario: 接口返回未登录
- **WHEN** 任意接口响应 `code === -2`
- **THEN** 系统跳转至 SSO 登录页，携带当前页面地址作为 `redirectUrl`

#### Scenario: 登录后返回
- **WHEN** 用户在 SSO 页完成登录并重定向回来
- **THEN** Cookie 已写入，正常访问受保护页面
