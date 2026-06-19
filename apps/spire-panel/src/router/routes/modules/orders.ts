import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ant-design:shopping-cart-outlined',
      order: 2,
      title: $t('page.orders.title'),
    },
    name: 'Orders',
    path: '/orders',
    children: [
      {
        name: 'OrderList',
        path: '/orders',
        component: () => import('#/views/orders/index.vue'),
        meta: {
          icon: 'ant-design:shopping-cart-outlined',
          title: $t('page.orders.list'),
        },
      },
    ],
  },
];

export default routes;
