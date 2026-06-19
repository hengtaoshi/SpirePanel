<template>
  <div class="p-4">
    <a-card>
      <template #extra>
        <a-button type="primary" @click="handleCreate">
          {{ $t('page.tenants.create') }}
        </a-button>
      </template>

      <a-table
        :columns="columns"
        :data-source="tenants"
        :loading="loading"
        :pagination="{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? $t('page.tenants.active') : $t('page.tenants.inactive') }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                :title="record.status === 'active' ? $t('page.tenants.confirmDisable') : '确认启用？'"
                @confirm="handleToggleStatus(record)"
              >
                <a>{{ record.status === 'active' ? '停用' : '启用' }}</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 创建/编辑弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="editingTenant ? $t('page.tenants.edit') : $t('page.tenants.create')"
      :confirm-loading="submitting"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form :model="formState" layout="vertical">
        <a-form-item :label="$t('page.tenants.name')" name="name" :rules="[{ required: true }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item :label="$t('page.tenants.slug')" name="slug" :rules="[{ required: true }]">
          <a-input v-model:value="formState.slug" />
        </a-form-item>
        <a-form-item :label="$t('page.tenants.contactEmail')" name="contactEmail">
          <a-input v-model:value="formState.contactEmail" />
        </a-form-item>
        <a-form-item :label="$t('page.tenants.contactName')" name="contactName">
          <a-input v-model:value="formState.contactName" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import { $t } from '#/locales';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  contactEmail: string;
  contactName: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const columns = [
  { title: $t('page.tenants.name'), dataIndex: 'name', key: 'name' },
  { title: $t('page.tenants.slug'), dataIndex: 'slug', key: 'slug' },
  { title: $t('page.tenants.contactEmail'), dataIndex: 'contactEmail', key: 'contactEmail' },
  { title: $t('page.tenants.contactName'), dataIndex: 'contactName', key: 'contactName' },
  { title: $t('page.tenants.status'), dataIndex: 'status', key: 'status' },
  { title: $t('page.tenants.createdAt'), dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'action' },
];

const loading = ref(false);
const tenants = ref<Tenant[]>([]);
const modalVisible = ref(false);
const submitting = ref(false);
const editingTenant = ref<Tenant | null>(null);
const formState = reactive({
  name: '',
  slug: '',
  contactEmail: '',
  contactName: '',
});

async function fetchTenants() {
  loading.value = true;
  try {
    // TODO: 对接 Supabase API
    // tenants.value = await tenantApi.getList();
  } finally {
    loading.value = false;
  }
}

function handleCreate() {
  editingTenant.value = null;
  Object.assign(formState, { name: '', slug: '', contactEmail: '', contactName: '' });
  modalVisible.value = true;
}

function handleEdit(record: Tenant) {
  editingTenant.value = record;
  Object.assign(formState, record);
  modalVisible.value = true;
}

async function handleSubmit() {
  submitting.value = true;
  try {
    // TODO: 调用 API 保存
    modalVisible.value = false;
    await fetchTenants();
  } finally {
    submitting.value = false;
  }
}

function handleCancel() {
  modalVisible.value = false;
}

async function handleToggleStatus(_record: Tenant) {
  // TODO: 调用 API 切换状态
}

function handleTableChange() {
  // TODO: 分页
}

onMounted(fetchTenants);
</script>
