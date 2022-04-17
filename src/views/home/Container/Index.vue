<template>
  <div class="container">
    <div class="left">
      <Menu />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from './components/Menu/Index.vue';

export default defineComponent({
  name: 'Container',
  components: {
    Menu
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  background: #fff;
}

.left {
  width: 200px;
  border-right: 1px solid #ccc;
}

.right {
  flex: 1;
  padding: 10px 0 0 30px;
  overflow-y: auto;
}
</style>
