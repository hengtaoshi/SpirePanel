# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SpirePanel** — SaaS 运营管理后台，基于 Vue Vben Admin v5 构建。
Lite 版开源在 GitHub，Pro 版作为付费源码销售。

## Commands

```bash
# 安装依赖
pnpm install

# 开发（默认启动 spire-panel）
cd apps/spire-panel && pnpm dev

# 构建
pnpm build --filter=@spirepanel/app

# 类型检查
pnpm check:type
# 或针对单个应用：
cd apps/spire-panel && pnpm typecheck

# Lint
pnpm lint              # oxlint + eslint
pnpm format            # 自动修复格式

# 其他
pnpm commit            # 交互式 commit (czg)
pnpm test:unit         # 单元测试 (vitest)
```

## Architecture

### Monorepo 结构

```
SpirePanel/
├── apps/
│   ├── spire-panel/        ← 主要目标应用
│   ├── web-antd/           # 上游 Vben 模板（参考用）
│   └── backend-mock/       # Nitro mock 服务
├── packages/               # @vben/* 共享包
│   ├── @core/             # 核心包（base/ui-kit/forward）
│   ├── effects/           # 副作用包
│   ├── locales/           # i18n 核心
│   ├── constants/         # 常量定义
│   └── ...
├── internal/               # 构建/配置工具
│   ├── vite-config/        # Vite 配置封装
│   ├── lint-configs/       # ESLint/Oxlint 配置
│   └── tsconfig/           # TS 配置模板
├── scripts/                # 辅助脚本
└── turbo.json              # Turbo 编排
```

### app/spire-panel 结构

```
src/
├── api/                    # API 层
│   ├── client.ts           # Supabase 客户端（待安装 @supabase/supabase-js）
│   ├── dashboard.ts        # Dashboard stats 接口
│   ├── tenants.ts          # 租户 CRUD 接口
│   ├── orders.ts           # 订单接口
│   └── core/               # 核心接口（auth, menu, user）
├── router/
│   ├── routes/modules/     # 自动发现路由（import.meta.glob）
│   │   ├── dashboard.ts    # 仪表盘路由
│   │   ├── tenants.ts      # 租户管理（Lite 功能）
│   │   ├── orders.ts       # 订单管理（Lite 功能）
│   │   ├── settings.ts     # 系统设置
│   │   ├── tickets.ts      # 工单系统（ProOnly）
│   │   └── monitor.ts      # 监控（ProOnly）
│   └── index.ts            # 路由聚合 + filterProRoutes()
├── views/                  # 页面组件
│   ├── dashboard/          # 仪表盘（workspace + analytics）
│   ├── tenants/            # 租户管理
│   ├── orders/             # 订单管理
│   ├── settings/           # 系统设置
│   ├── tickets/            # 工单系统（Pro 占位）
│   └── monitor/            # 监控（Pro 占位）
├── locales/                # i18n
│   ├── langs/zh-CN/
│   │   └── page.json       # 中文翻译（page. 命名空间）
│   └── langs/en-US/
│       └── page.json       # 英文翻译
├── utils/
│   ├── feature-flag.ts     # Lite/Pro 功能开关
│   └── upgrade-prompt.vue  # Pro 升级提示组件
├── store/auth.ts           # Pinia auth store
├── preferences.ts          # 应用偏好配置
└── bootstrap.ts            # 应用初始化
supabase/
├── migrations/             # SQL 迁移文件
├── seed.sql                # 种子数据
├── functions/              # Edge Functions (Deno)
│   ├── _shared/            # 公共模块 (cors, response)
│   ├── dashboard/          # Dashboard 统计
│   ├── tenants/            # 租户列表
│   └── orders/             # 订单列表
└── config.toml             # Supabase 本地配置
```

## Key Patterns

### i18n
- 文件名作命名空间：`page.json` → 所有 key 通过 `page.` 前缀访问
- 使用方式：`$t('page.tenants.title')`
- 通过 `loadLocalesMapFromDir` 自动加载 `langs/**/*.json`

### 路由
- 模块路由文件放在 `router/routes/modules/*.ts`，通过 `import.meta.glob` 自动发现
- 路由元数据 `meta.icon` 使用 Iconify 图标名（如 `clarity:building-line`）
- Pro 路由设置 `meta: { proOnly: true }`，由 `filterProRoutes()` 在 Lite 版中过滤

### Lite / Pro 功能隔离
- `VITE_PRO_ENABLED=false` 时显示 Lite 版
- 功能开关定义在 `src/utils/feature-flag.ts`
- Pro 页面使用 `<UpgradePrompt>` 组件展示升级提示
- Lite 限制常量：`LITE_LIMITS.maxTenants = 5`

### 组件库适配
- UI 层使用 Ant Design Vue 4
- 适配层在 `src/adapter/`，封装 Form、Table 等组件
- 图标使用 `@vben/icons`（Iconify + ant-design 图标集）

### API 层
- Supabase 客户端在 `api/client.ts`（需要安装 `@supabase/supabase-js`）
- Edge Function 调用走 Supabase `client.functions.invoke()`
- 或通过 Vite proxy → 本地 mock 服务

### Supabase Edge Functions
- 使用 Deno 运行时，通过 `esm.sh` 导入依赖
- 统一响应格式：`_shared/response.ts`（`success()` / `error()`）
- CORS 处理：`_shared/cors.ts`
- 认证：`supabase.auth.getUser()` JWT 验证
- 租户隔离：Edge Function 内部通过 `tenant_users` 表映射当前用户

### 数据库
- 7 张核心表：tenants, users, tenant_users, plans, subscriptions, orders, audit_logs
- RLS 策略通过 `get_user_tenant_ids()` 函数实现租户隔离
- `set_updated_at()` 触发器自动维护 `updated_at` 字段
- `handle_new_user()` 触发器同步 Supabase Auth → public.users

### 构建与工具链
- Vite 8 + vue-tsc 类型检查
- 代码检查：oxlint（主）+ eslint（辅助）+ stylelint（样式）
- 格式化：oxfmt（替代 prettier）
- 提交：commitlint（conventional commits）+ czg（交互式）
- Lefthook 管理 git hooks：提交前自动 lint + typecheck
