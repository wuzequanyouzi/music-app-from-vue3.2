<template>
  <div class="musicCard">
    <el-image
      class="img"
      fit="fill"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElImage } from 'element-plus';
</script>

<style lang="scss" scoped>
.musicCard {
  width: 100%;
  height: 100%;
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
