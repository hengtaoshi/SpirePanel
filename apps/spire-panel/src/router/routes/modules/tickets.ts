import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

/** Pro 版工单路由 - Lite 版作为占位 */
const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ant-design:customer-service-outlined',
      order: 20,
      title: $t('page.tickets.title'),
      // 使用自定义 meta 标记为 Pro 功能
      proOnly: true,
    },
    name: 'Tickets',
    path: '/tickets',
    children: [
      {
        name: 'TicketList',
        path: '/tickets',
        component: () => import('#/views/tickets/index.vue'),
        meta: {
          icon: 'ant-design:customer-service-outlined',
          title: $t('page.tickets.list'),
          proOnly: true,
        },
      },
    ],
  },
];

export default routes;
