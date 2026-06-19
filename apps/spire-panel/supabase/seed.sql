-- ============================================
-- SpirePanel 种子数据
-- ============================================

-- 套餐
insert into public.plans (name, code, description, price_monthly, price_yearly, features, sort_order) values
(
  'Lite',
  'lite',
  '适合初创团队的基础运营管理面板',
  0,
  0,
  '[
    "最多 5 个租户",
    "基础仪表盘",
    "租户管理",
    "订单管理",
    "系统设置",
    "社区支持"
  ]'::jsonb,
  1
),
(
  'Pro',
  'pro',
  '适合成长型团队的完整运营管理方案',
  299,
  2999,
  '[
    "无限租户",
    "高级仪表盘",
    "工单系统",
    "用量监控",
    "通知推送",
    "高级数据分析",
    "客户门户",
    "优先支持"
  ]'::jsonb,
  2
);

-- 默认超级管理员（安装后请修改密码）
-- 通过 Supabase Auth 创建，这里只插入用户记录占位
insert into public.users (id, email, name, is_super_admin)
values ('00000000-0000-0000-0000-000000000000', 'admin@spirepanel.com', 'Super Admin', true)
on conflict (id) do nothing;
