<template>
  <div class="p-4">
    <a-card>
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="general" :tab="$t('page.settings.general')">
          <a-form :model="generalForm" layout="vertical" class="max-w-lg">
            <a-form-item label="应用名称">
              <a-input v-model:value="generalForm.appName" disabled />
            </a-form-item>
            <a-form-item label="版本">
              <a-input v-model:value="generalForm.version" disabled />
            </a-form-item>
            <a-form-item label="默认语言">
              <a-select v-model:value="generalForm.locale">
                <a-select-option value="zh-CN">简体中文</a-select-option>
                <a-select-option value="en-US">English</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSave('general')">
                {{ $t('page.settings.saveSuccess') }}
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="billing" :tab="$t('page.settings.billing')">
          <div class="py-8 text-center text-muted-foreground">
            计费设置 — Pro 版功能
            <a-button type="link" href="https://github.com/hengtaoshi/SpirePanel" target="_blank">
              {{ $t('page.spire.upgradeBtn') }}
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const activeTab = ref('general');

const generalForm = reactive({
  appName: 'SpirePanel',
  version: '0.1.0 Lite',
  locale: 'zh-CN',
});

function handleSave(_tab: string) {
  // TODO: 保存设置
}
</script>
