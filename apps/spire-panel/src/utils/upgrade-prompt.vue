<template>
  <a-result status="info" :title="$t('page.spire.proFeatureTitle')" :sub-title="$t('page.spire.proFeatureDesc')">
    <template #extra>
      <a-button type="primary" @click="handleUpgrade">
        {{ $t('page.spire.upgradeBtn') }}
      </a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
const emit = defineEmits<{ upgrade: [] }>();

function handleUpgrade() {
  emit('upgrade');
  // TODO: 跳转到 Pro 购买页面
  window.open('https://github.com/hengtaoshi/SpirePanel', '_blank');
}
</script>
