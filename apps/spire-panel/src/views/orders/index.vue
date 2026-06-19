<template>
  <div class="p-4">
    <a-card>
      <template #extra>
        <a-button type="primary" @click="handleCreateOrder">
          {{ $t('page.orders.createOrder') }}
        </a-button>
      </template>

      <!-- 统计概要 -->
      <a-row :gutter="16" class="mb-4">
        <a-col :span="6">
          <a-card size="small">
            <a-statistic :title="$t('page.orders.totalRevenue')" :value="totalRevenue" prefix="¥" />
          </a-card>
        </a-col>
      </a-row>

      <a-table
        :columns="columns"
        :data-source="orders"
        :loading="loading"
        :pagination="{ pageSize: 10, showSizeChanger: true }"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'amount'">
            ¥{{ record.amount }}
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="statusColor(record.status)">
              {{ statusLabel(record.status) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a @click="handleView(record)">查看</a>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { $t } from '#/locales';

interface Order {
  id: string;
  orderNo: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paidAt: string | null;
  createdAt: string;
}

const columns = [
  { title: $t('page.orders.orderNo'), dataIndex: 'orderNo', key: 'orderNo' },
  { title: $t('page.orders.amount'), dataIndex: 'amount', key: 'amount' },
  { title: $t('page.orders.status'), dataIndex: 'status', key: 'status' },
  { title: $t('page.orders.paymentMethod'), dataIndex: 'paymentMethod', key: 'paymentMethod' },
  { title: $t('page.orders.paidAt'), dataIndex: 'paidAt', key: 'paidAt' },
  { title: '操作', key: 'action' },
];

const loading = ref(false);
const orders = ref<Order[]>([]);
const totalRevenue = ref(0);

function statusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'orange',
    paid: 'green',
    failed: 'red',
    refunded: 'purple',
    expired: 'default',
  };
  return map[status] || 'default';
}

function statusLabel(status: string) {
  return $t(`orders.${status}`) || status;
}

async function fetchOrders() {
  loading.value = true;
  try {
    // TODO: 对接 Supabase API
  } finally {
    loading.value = false;
  }
}

function handleCreateOrder() {
  // TODO: 创建订单弹窗
}

function handleView(_record: Order) {
  // TODO: 查看订单详情
}

onMounted(fetchOrders);
</script>
