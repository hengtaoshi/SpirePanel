import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ant-design:setting-outlined',
      order: 10,
      title: $t('page.settings.title'),
    },
    name: 'Settings',
    path: '/settings',
    children: [
      {
        name: 'GeneralSettings',
        path: '/settings',
        component: () => import('#/views/settings/index.vue'),
        meta: {
          icon: 'ant-design:setting-outlined',
          title: $t('page.settings.general'),
        },
      },
    ],
  },
];

export default routes;
