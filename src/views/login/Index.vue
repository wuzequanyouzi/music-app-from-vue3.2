<template>
  <div class="login">
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <span class="close" @click="handleClickClose">
      <!-- <CloseOutlined /> -->
      X
    </span>
    <div class="circle_box">
      <div class="circle" :style="{ '--x': 0 }"></div>
      <div class="circle" :style="{ '--x': 1 }"></div>
      <div class="circle" :style="{ '--x': 2 }"></div>
      <div class="circle" :style="{ '--x': 3 }"></div>
      <div class="circle" :style="{ '--x': 4 }"></div>
    </div>
    <div class="container">
      <div class="logo">
        <img :src="logo" />
      </div>
      <div class="login_info">
        <div class="info_item">
          <!-- <Input prefix={<MobileOutlined />} value={username} onChange={handleChangeUsername} placeholder="请输入用户名" /> -->
        </div>
        <div class="info_item">
          <!-- <Input.Password prefix={<LockOutlined />} value={password} onChange={handleChangePassword} placeholder="请输入密码" /> -->
        </div>
        <div class="info_item">
          <div class="login_auto">
            <Switch size="small" defaultChecked @change="handleChangeAutoLogin" />
            <span :style="{ marginLeft: '10px' }">自动登录</span>
          </div>
        </div>
        <div class="login_btn" @click="handleClickLogin">登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const { ipcRenderer } = window.require('electron');
// import * as md5 from 'md5';
import { LoginService } from '@/server';
// import logo from '@/assets/images/boluo.png';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      isAutoLogin: false,
      username: '',
      password: '',
      logo: ''
    };
  },
  methods: {
    handleClickClose() {
      ipcRenderer.send('login-window-close');
    },

    // 自动登录
    handleChangeAutoLogin(checked: boolean) {
      this.isAutoLogin = checked;
    },
    handleClickLogin() {
      // LoginService.phoneLogin({
      //   phone: this.username,
      //   md5_password: md5(this.password)
      // }).then((data: any) => {
      //   ipcRenderer.send('login-after', data);
      //   // handleClickClose();
      // });
    }
  }
});
</script>

<style lang="scss" scoped>
.login {
  -webkit-app-region: drag;
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}
.color {
  position: absolute;
  filter: blur(75px);
}

.color:nth-child(1) {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 150px;
  background: #ff359b;
}

.color:nth-child(2) {
  bottom: 100px;
  left: 20px;
  width: 175px;
  height: 150px;
  background: #fffd87;
}

.color:nth-child(3) {
  bottom: 100px;
  right: 20px;
  width: 175px;
  height: 150px;
  background: #00d2ff;
}

.circle_box {
  width: 100%;
  height: 100%;
  position: absolute;
  .circle {
    position: absolute;
    background: rgba($color: #fff, $alpha: 0.1);
    // backdrop-filter属性为一个元素后面区域添加模糊效果
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba($color: #fff, $alpha: 0.1);
    border: 1px solid rgba($color: #fff, $alpha: 0.5);
    border-right: 1px solid rgba($color: #fff, $alpha: 0.2);
    border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
    border-radius: 50%;

    // hue-rotate 给图像应用色相旋转
    filter: hue-rotate(calc(var(--x) * 70deg));
    animation: animate 10s linear infinite;
    animation-delay: calc(var(--x) * -1s);
  }
  .circle:nth-child(1) {
    width: 60px;
    height: 60px;
    left: 30px;
    top: 80px;
  }

  .circle:nth-child(2) {
    width: 80px;
    height: 80px;
    right: 30px;
    bottom: 80px;
  }

  .circle:nth-child(3) {
    width: 40px;
    height: 40px;
    left: 120px;
    top: 150px;
  }

  .circle:nth-child(4) {
    width: 120px;
    height: 120px;
    left: 20px;
    bottom: 120px;
  }

  .circle:nth-child(5) {
    width: 100px;
    height: 100px;
    right: 50px;
    top: 200px;
  }
}

.close {
  -webkit-app-region: no-drag;
  user-select: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-top: 30px;
    z-index: 1;
  }
  .login_info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    height: 220px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1;
    -webkit-app-region: no-drag;
    padding: 10%;
    :global(.ant-input-affix-wrapper) {
      background-color: transparent;
    }
    :global(.ant-input) {
      background-color: transparent;
    }
    .info_item:nth-child(2) {
      margin-top: 6px;
    }
    .login_auto {
      margin-top: 6px;
      width: 100px;
      display: flex;
      align-items: center;
    }
    :global(.ant-switch-checked) {
      background-color: #ec4141;
    }
    .login_btn {
      width: 200px;
      height: 30px;
      box-sizing: content-box;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      margin-top: 16px;
      border-radius: 6px;
      background-color: #ec4141;
      cursor: pointer;
      color: #fff;
      &:active {
        background-color: rgb(158, 38, 38);
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }
  50% {
    transform: translateY(50px);
  }
}
</style>