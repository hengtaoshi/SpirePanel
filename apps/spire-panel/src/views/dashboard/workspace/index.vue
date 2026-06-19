<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: 'SpirePanel SaaS 运营管理后台 — Lite 版开源发布',
    date: '2026-06-19',
    group: '开源',
    icon: 'carbon:logo-github',
    title: 'SpirePanel',
    url: 'https://github.com/hengtaoshi/SpirePanel',
  },
  {
    color: '#3fb27f',
    content: 'SpirePanel Pro 版功能规划与开发',
    date: '2026-06-19',
    group: 'Pro',
    icon: 'ion:rocket-outline',
    title: 'Pro 版路线图',
    url: '#',
  },
  {
    color: '#e18525',
    content: '随时了解 SaaS 运营数据分析最佳实践',
    date: '2026-06-19',
    group: '文档',
    icon: 'ion:document-text-outline',
    title: '开发文档',
    url: '#',
  },
];

const quickNavItems: WorkbenchQuickNavItem[] = [
  { color: '#1fdaca', icon: 'ion:home-outline', title: '仪表盘', url: '/dashboard/analytics' },
  { color: '#bf0c2c', icon: 'clarity:building-line', title: '租户管理', url: '/tenants' },
  { color: '#e18525', icon: 'ant-design:shopping-cart-outlined', title: '订单管理', url: '/orders' },
  { color: '#3fb27f', icon: 'ant-design:setting-outlined', title: '系统设置', url: '/settings' },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  { completed: false, content: '对接 Supabase 数据库', date: '2026-06-19', title: '数据库集成' },
  { completed: false, content: '实现租户管理 CRUD', date: '2026-06-19', title: '租户管理开发' },
  { completed: false, content: '实现订单列表与服务', date: '2026-06-19', title: '订单管理开发' },
  { completed: false, content: '编写 Edge Functions API', date: '2026-06-19', title: 'API 开发' },
]);

const trendItems: WorkbenchTrendItem[] = [
  { avatar: 'svg:avatar-1', content: '初始化 SpirePanel 项目结构', date: '刚刚', title: '系统' },
  { avatar: 'svg:avatar-2', content: '完成数据库表结构设计', date: '1小时前', title: '进展' },
];

const router = useRouter();

function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch(console.error);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar">
      <template #title>
        早安, {{ userStore.userInfo?.realName }}, 欢迎使用 SpirePanel！
      </template>
      <template #description> SaaS 运营管理后台 — Lite 版 v0.1.0 </template>
    </WorkbenchHeader>

    <div class="flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" title="项目" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="最新动态" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav :items="quickNavItems" class="lg:mt-0" title="快捷导航" @click="navTo" />
        <WorkbenchTodo :items="todoItems" class="mt-5" title="待办事项" />
        <AnalysisChartCard class="mt-5" title="访问来源">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
