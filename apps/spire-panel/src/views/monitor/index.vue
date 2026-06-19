<template>
  <div class="p-4">
    <UpgradePrompt @upgrade="handleUpgrade" />
  </div>
</template>

<script setup lang="ts">
import UpgradePrompt from '#/utils/upgrade-prompt.vue';

function handleUpgrade() {
  // Pro 版购买跳转
}
</script>
