<template>
  <div class="header">
    <div class="left">
      <div class="title">
        <i class="iconfont icon-wangyiyunyinle logo"></i>
        <header class="label">网易云音乐</header>
      </div>
      <div class="search_box">
        <div class="search_input">
          <!-- <Input placeholder="搜索" class="input" prefix={<SearchIcon />}></Input> -->
        </div>
        <!-- {/* <NavLink to="/test"><i class={`iconfont icon-tinggeshiqu font_size_20 ${listen_icon}`} ></i></NavLink> */} -->

        <div @click="handleOpenLyric">
          <i class="iconfont icon-tinggeshiqu font_size_20 listen_icon"></i>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="user_option" @click="handleClickLogin">
        <div class="user_avatar">
          <el-avatar :size="32" :src="isLogined ? userInfo.profile.avatarUrl : ''" />
        </div>
        <span v-if="!isLogined && userInfo?.code !== 200">未登录</span>
        <span v-else class="nickname">{{userInfo?.profile?.nickname}}</span>
      </div>
      <div class="system_option">
        <i
          class="iconfont icon-suoxiao"
          :style="{ fontSize: '20px', cursor: 'pointer' }"
          @click="handleClickMize"
        ></i>
        <i
          :class="['iconfont', isFullScreen ? 'icon-suofang' : 'icon-fangda']"
          :style="{ fontSize: '20px', cursor: 'pointer' }"
          @click="handleChangeFullScreen"
        ></i>
        <i class="iconfont icon-guanbi" :style="{ fontSize: '18px', cursor: 'pointer' }"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const { ipcRenderer } = window.require('electron');
export default defineComponent({
  name: 'Header',
  data() {
    return {
      isLogined: false,
      userInfo: {},
      isFullScreen: false
    };
  },
  methods: {
    // 打开歌词面板
    handleOpenLyric() {
      // ipcRenderer.send('lyric-open');
      console.log('lyric-open');
    },

    handleClickLogin() {
      !this.isLogined && ipcRenderer.send('login-before', 'login');
      // !this.isLogined && console.log('login-before');
    },

    handleClickMize() {
      // ipcRenderer.send('set-minimize');
      console.log('set-minimize');
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ec4141;
  color: #fff;
  -webkit-app-region: drag;
}

.logo {
  font-size: 28px !important;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background-color: #fff;
  color: #ec4141;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  width: 500px;
  margin-left: 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left > .title {
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
}

.label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 22px;
  padding: 5px;
}

.search_box {
  display: flex;
  -webkit-app-region: no-drag;
}

.search_icon {
  font-size: 20px;
  color: #fff;
}

.input {
  background-color: #c73e3e !important;
  border-radius: 16px !important;
  border: none !important;
  :global(.ant-input) {
    background-color: transparent !important;
    color: #fff;
  }
}

.listen_icon {
  margin-left: 20px;
  cursor: pointer;
}

.right {
  width: 420px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user_option {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-app-region: no-drag;
  .user_avatar {
    margin-right: 10px;
  }
  .nickname {
    width: 90px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: #ddd;
  }
}

.system_option {
  width: 200px;
  height: 22px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-left: 1px solid #fff;
  -webkit-app-region: no-drag;
}
</style>
