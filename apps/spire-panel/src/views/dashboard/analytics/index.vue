<template>
  <div class="p-5">
    <!-- SaaS 概览卡片 -->
    <AnalysisOverview :items="overviewItems" />

    <!-- 近期订单趋势 -->
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends />
      </template>
      <template #visits>
        <AnalyticsVisits />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="订单状态分布">
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="租户增长">
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="收入趋势">
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverview,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

// FIXME: Lite 版对接 Supabase 后替换为真实数据
const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: '租户总数',
    totalTitle: '当前租户',
    totalValue: 0,
    value: 0,
  },
  {
    icon: SvgCakeIcon,
    title: '用户总数',
    totalTitle: '活跃用户',
    totalValue: 0,
    value: 0,
  },
  {
    icon: SvgDownloadIcon,
    title: '订单总数',
    totalTitle: '本月订单',
    totalValue: 0,
    value: 0,
  },
  {
    icon: SvgBellIcon,
    title: '总收入',
    totalTitle: '本月收入',
    totalValue: 0,
  },
];

const chartTabs: TabOption[] = [
  { label: '近期订单', value: 'trends' },
  { label: '租户活跃度', value: 'visits' },
];
</script>
