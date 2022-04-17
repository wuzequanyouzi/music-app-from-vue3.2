<template>
  <div class="footer">
    <SongDetail :isShow="showSongDetail" />
    <div class="left">
      <div :class="['translate', showSongDetail && 'translate_show']">
        <div class="up" @click="handleClickShowSongDetail">
          <img class="pic_img" :src="currentPlayingSong?.al?.picUrl" />
          <div class="song_info">
            <div class="song_name">
              <span>{{currentPlayingSong.name}}</span>
              <div v-if="isVipSong" class="vip">VIP</div>
              <i
                :class="['iconfont collected', collected ? 'icon-collected' : 'icon-notcollected']"
              ></i>
            </div>
            <div class="song_author">
              <span>{{playingSongFormat(currentPlayingSong)}}</span>
            </div>
          </div>
        </div>
        <div class="down" @click="handleClickHideSongDetail">
          <div class="option">
            <i :class="['iconfont collected', collected ? 'icon-collected' : 'icon-notcollected']"></i>
          </div>
          <div class="option">
            <i :class="['iconfont collected', collected ? 'icon-collected' : 'icon-notcollected']"></i>
          </div>
          <div class="option">
            <i :class="['iconfont collected', collected ? 'icon-collected' : 'icon-notcollected']"></i>
          </div>
          <div class="option">
            <i :class="['iconfont collected', collected ? 'icon-collected' : 'icon-notcollected']"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="center_up">
        <div class="iconfont mode center_option"></div>
        <div class="iconfont icon-last_song last_song center_option"></div>
        <div
          :class="['iconfont play center_option', isPlaying ? 'icon-pause' : 'icon-play', ]"
          @click="handleClickPlay"
        ></div>
        <div class="iconfont icon-next_song next_song center_option"></div>
        <div class="iconfont lyric center_option"></div>
      </div>
      <div class="center_down">
        <div class="song_audio">
          <span class="timer">{{currentMusicDuration}}</span>
          <div class="progress_bar">
            <div ref="{currentProgressBar}" class="progress_bar_current"></div>
          </div>
          <span class="timer">{{musicDuration}}</span>
          <audio
            ref="audioDom"
            :src="currentPlayingSongMp3Info.url"
            @canplay="getMusicDuration"
            @timeupdate="getMusicCurrentDuration"
          ></audio>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
const { ipcRenderer } = window.require('electron');
import { defineComponent } from 'vue';

// 格式化时间00:00
const formatTime = (time: number): string => {
  const _duration = Math.round(time);
  const minute = Math.floor(_duration / 60);
  const second = _duration % 60;
  const resultTime = `${(Array(2).join('0') + minute).slice(-2)}:${(Array(2).join('0') + second).slice(-2)}`;
  return resultTime;
};
export default defineComponent({
  name: 'Footer',
  props: {},
  data() {
    return {
      collected: false,
      isVipSong: false,
      isPlaying: false,
      showSongDetail: false,
      currentPlayingSong: {
        id: null
      },
      currentPlayingSongMp3Info: {
        url: ''
      },
      musicDuration: '00:00',
      currentMusicDuration: '00:00'
    };
  },
  watch: {
    currentSongInfo(newVal) {
      console.log(newVal.id, this.currentPlayingSong.id, newVal.id !== this.currentPlayingSong.id);
      if (newVal.id && newVal.id !== this.currentPlayingSong.id) {
        this.currentPlayingSong = newVal;
        (this.$refs.audioDom as any).current.pause();
      }
    },
    currentPlayingSong(newVal) {
      if (!newVal.id) return;
      // 请求接口
      // SongService.getSongMp3Url({
      //   id: currentPlayingSong.id
      // }).then(data => {
      //   setCurrentPlayingSongMp3Info(data[0]);
      // });
    }
  },
  methods: {
    // 格式化名称
    playingSongFormat(currentPlayingSong: any) {
      return currentPlayingSong?.ar?.map((arItem: any) => arItem.name).join('/') || '暂无';
    },

    // 播放暂停按钮点击事件回调
    handleClickPlay() {
      const _isPlaying = !this.isPlaying;
      if (_isPlaying) {
        (this.$refs.audioDom as any).current.play();
      } else {
        (this.$refs.audioDom as any).current.pause();
      }
      this.isPlaying = _isPlaying;
    },

    // 获取音乐时长
    getMusicDuration() {
      const _musicDuration = formatTime((this.$refs.audioDom as any).current.duration);
      this.musicDuration = _musicDuration;
    },

    // 获取音乐播放实时时间
    getMusicCurrentDuration() {
      const audioDom: any = this.$refs.audioDom;
      const _currentDuration = formatTime(audioDom.current.currentTime);
      // if (audioDom.current.currentTime >= audioDom.current.duration) {
      //   currentProgressBar.current.style.width = '100%';
      // } else {
      //   const width = Math.round(currentProgressBar.current.parentNode.offsetWidth * (audioDom.current.currentTime / audioDom.current.duration));
      //   currentProgressBar.current.style.width = `${width}px`;
      // }
      // console.log(audioDom.current.currentTime);
      // ipcRenderer.send('emit-update-lrc-words', audioDom.current.currentTime);
      // setCurrentMusicDuration(_currentDuration);
    },

    handleClickShowSongDetail() {
      this.showSongDetail = true;
    },
    handleClickHideSongDetail() {
      this.showSongDetail = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  .footer_box {
    z-index: 1;
  }
  .left {
    z-index: 1;
    max-width: 380px;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 2;
    background-color: lightblue;
    .up {
      width: 100%;
      height: 50%;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .pic_img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }
      .song_info {
        overflow: hidden;
        height: 100%;
        flex: 1;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .song_name {
          display: flex;
          align-items: center;
          > span {
            width: 80%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .down {
      width: 100%;
      height: 50%;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .center {
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 3;
    background-color: #fff;
    .center_up {
      width: 250px;
      margin: 0 auto;
      flex: 2;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .center_option {
        font-size: 22px;
        cursor: pointer;
        &:hover {
          color: #c75151;
        }
        &:nth-child(3) {
          font-size: 26px;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          background-color: #eee;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #ccc;
          }
          &::before {
            display: flex;
            width: 24px;
            height: 24px;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .center_down {
      width: 100%;
      flex: 1;
      .song_audio {
        width: 430px;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        color: #888;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        .progress_bar {
          flex: 1;
          height: 3px;
          border-radius: 3px;
          margin: 0 6px;
          background-color: #777;
          display: flex;
          align-items: center;
          .progress_bar_current {
            width: 0px;
            height: 3px;
            background-color: #c73e3e;
          }
        }
      }
    }
  }
  .right {
    z-index: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
    background-color: pink;
  }
}

.translate {
  width: 100%;
  height: 200%;
  transition: all 0.5s;
  position: absolute;
}

.translate_show {
  transform: translateY(-50%) !important;
}

.vip {
  font-size: 8px;
  border: 1px solid orange;
}
.collected {
  width: 20px;
  height: 20px;
  margin-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px !important;
  cursor: pointer;
}

.option {
  border-radius: 50%;
  border: 1px solid #aaa;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  .collected {
    margin: 0;
  }
}
</style>