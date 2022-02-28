# 基于 React 的仿 Jira 任务管理系统

## 基本功能

- JWT 登录注册
- 项目列表
- 项目详情
- 项目编辑删除
- 任务列表
- 任务排序
- 看板列表
- 看板排序
- ...

## Technology stack

- react@17+hook+TS+react-query+redx-tookit+@emotion+react-router@6；

- 后台使用的是用 MSW 以 Service Worker 为原理实现的“分布式后端”；

- 自定义的 Hook 包括：异步操作、状态管理、debounce、路由、增删改查等

- Hook + Context/Redux Toolkit 管理全局状态
- React Query 管理服务端全局状态
- 自动化测试：单元测试、集成测试、e2e 测试
- CSS-in-JS 解决方案@emotion/react、Grid、Flexbox
- React Router6

## Start

```shell
yarn

yarn start
```
