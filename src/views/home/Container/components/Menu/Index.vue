<template>
  <div class="menu">
    <div class="plubic_menu">
      <div
        v-for="menuItem in menu"
        :key="menuItem.name"
        :class="['plubic_menu_item', activeMenuItem === menuItem.name ? 'plubic_menu_item_active' : '']"
        @click="() => handleClickMenuItem(menuItem)"
      >{{menuItem.name}}</div>
    </div>
    <div class="my_music">
      <header class="header">我的音乐</header>
      <div class="container">
        <div
          v-for="musicItem in myMusic"
          :key="musicItem.name"
          :class="['my_music_item', activeMenuItem === musicItem.name ? 'plubic_menu_item_active' : '' ]"
          @click="() => handleClickMenuItem(musicItem)"
        >
          <i class="iconfont icon-tinggeshiqu public_icon"></i>
          <span>{{musicItem.name}}</span>
        </div>
      </div>
    </div>
    <div class="my_music">
      <header class="header">创建的歌单</header>
      <div class="container">
        <div
          v-for="musicItem in songSheet"
          :key="musicItem.name"
          :class="['my_music_item', activeMenuItem === musicItem.name ? 'plubic_menu_item_active' : '']"
          @click="() => handleClickMenuItem(musicItem)"
        >
          <i class="iconfont icon-tinggeshiqu public_icon"></i>
          <span>{{musicItem.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    menu: {
      type: Array,
      default: () => [
        {
          name: '发现音乐',
          path: '/home/'
        },
        {
          name: '视频'
        },
        {
          name: '朋友'
        },
        {
          name: '直播'
        },
        {
          name: '私人FM'
        }
      ]
    },
    myMusic: {
      type: Array,
      default: () => [
        {
          name: '本地音乐'
        },
        {
          name: '下载管理'
        }
      ]
    },
    songSheet: {
      type: Array,
      default: () => [
        {
          name: '我喜欢的音乐'
        }
      ]
    }
  },
  data() {
    return {
      activeMenuItem: (this.menu[0] as any).name || '发现音乐'
    };
  },
  methods: {
    // 单击菜单事件
    handleClickMenuItem(menuItem: any) {
      this.activeMenuItem = menuItem.name;
      // this.$router.push(menuItem.path)
    }
  }
});
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  padding-left: 10px;
  user-select: none;
}
.plubic_menu {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 16px;
  margin-bottom: 8px;
}
.plubic_menu_item {
  color: #333;
  padding: 4px 8px;
  margin-right: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
}

.plubic_menu_item_active {
  color: #000;
  font-weight: 600;
  background-color: #eee;
}

.header {
  color: #bbb;
  padding-left: 8px;
}

.my_music {
  display: flex;
  flex-direction: column;
  .container {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin: 6px 0;
    .my_music_item {
      padding: 8px 4px;
      color: #333;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
  }
}
.public_icon {
  padding-right: 8px;
}
</style>