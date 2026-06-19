import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'clarity:building-line',
      order: 1,
      title: $t('page.tenants.title'),
    },
    name: 'Tenants',
    path: '/tenants',
    children: [
      {
        name: 'TenantList',
        path: '/tenants',
        component: () => import('#/views/tenants/index.vue'),
        meta: {
          icon: 'clarity:building-line',
          title: $t('page.tenants.list'),
        },
      },
    ],
  },
];

export default routes;
