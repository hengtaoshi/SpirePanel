import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

/** Pro 版监控路由 - Lite 版作为占位 */
const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ant-design:dashboard-outlined',
      order: 21,
      title: $t('page.monitor.title'),
      proOnly: true,
    },
    name: 'Monitor',
    path: '/monitor',
    children: [
      {
        name: 'MonitorOverview',
        path: '/monitor',
        component: () => import('#/views/monitor/index.vue'),
        meta: {
          icon: 'ant-design:dashboard-outlined',
          title: $t('page.monitor.overview'),
          proOnly: true,
        },
      },
    ],
  },
];

export default routes;
