<template>
  <div class="moduleCard">
    <div class="header">
      <span>{{ headerTitle }}</span>
      <el-icon size="18" color="#777">
        <arrow-right-bold />
      </el-icon>
    </div>
    <div class="container">
      <slot name="container" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';
import { ElIcon } from 'element-plus';
import { ArrowRightBold } from '@element-plus/icons-vue';
withDefaults(
  defineProps<{
    headerTitle: string;
  }>(),
  {
    headerTitle: '推荐歌单'
  }
);
</script>

<style lang="scss" scoped>
.moduleCard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  .header {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    margin-bottom: 4px;
    padding-left: 8px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  .container {
    flex: 1;
  }
}
</style>
