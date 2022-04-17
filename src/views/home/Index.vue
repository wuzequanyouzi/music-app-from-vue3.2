<template>
  <div>Home</div>
  <router-link to="/login">login</router-link>
  <router-link to="/friend">friend</router-link>
  <router-link to="/video">video</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const { ipcRenderer } = window.require('electron');
export default defineComponent({
  name: 'Home',
  mounted() {
    console.log(ipcRenderer);
  }
});
</script>

<style></style>
