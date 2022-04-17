<template>
  <div class="home">
    <header class="header">
      <Header v-bind="$attrs" />
    </header>
    <div class="container">
      <Container v-bind="$attrs" />
    </div>
    <footer class="footer">
      <Footer v-bind="$attrs" />
    </footer>
  </div>
</template>

<script lang="ts">
import Header from '@/views/home/Header/Index.vue';
import Container from '@/views/home/Container/Index.vue';
import Footer from '@/views/home/Footer/Index.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Header,
    Container,
    Footer
  }
});
</script>

<style lang="scss" scoped>
.home {
  width: 100vm;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  justify-self: start;
  height: 60px;
}

.container {
  flex: 1;
  overflow: hidden;
}

.footer {
  height: 74px;
  justify-self: end;
}
</style>