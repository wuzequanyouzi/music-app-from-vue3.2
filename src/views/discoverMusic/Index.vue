<template>
  <div class="discover">
    <header class="header">
      <p
        v-for="headerItem in HEADER_LIST"
        :key="headerItem.name"
        :class="['header_item', activeHeaderItem === headerItem.name ? 'active_header_item' : '']"
        @click="() => handleClickHeaderItem(headerItem)"
      >
        {{ headerItem.name }}
      </p>
    </header>
    <div class="container_box">
      <div class="container">
        <Carousel class="carousel" :autoplay="true" :delayTime="4000" :imageList="carouselImages" />
        <!-- 推荐 -->
        <ModuleCard headerTitle="推荐歌单">
          <div class="image_box">
            <div v-for="item in personalized" :key="item.id" class="image" @click="() => handleClickSongSheet(item)">
              <ImageCard :imageInfo="item" />
            </div>
          </div>
        </ModuleCard>
        <ModuleCard headerTitle="独家放送">
          <div class="three_image_box">
            <div v-for="item in privatecontent" :key="item.id" class="image" @click="() => {}">
              <ImageCard :imageInfo="item" />
            </div>
          </div>
        </ModuleCard>
        <ModuleCard headerTitle="最新音乐">
          <div class="{three_image_box}">
            <div v-for="item in newMusic" :key="item.id" class="image" @click="() => {}">
              <SongItem :songInfo="item" />
            </div>
          </div>
        </ModuleCard>
        <ModuleCard headerTitle="推荐MV">
          <div class="three_image_box" :style="{ gridTemplateColumns: `repeat(${personalizedMV.length || 3}, 1fr)` }">
            <div v-for="item in personalizedMV" :key="item.id" class="image" @click="() => {}">
              <ImageCard :imageInfo="item" />
            </div>
          </div>
        </ModuleCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HEADER_LIST } from '@/config/constants';
import {
  HomePageService,
  RecommendService,
  SongService,
  PrivatecontentService,
  PersonalizedService,
  TopService
} from '@/server/index';
export default defineComponent({
  name: 'DiscoverMusic',
  data() {
    return {
      HEADER_LIST,
      activeHeaderItem: HEADER_LIST[0].name,
      carouselImages: [], // 轮播图列表
      personalized: [], // 推荐歌单
      privatecontent: [], // 独家放送（入口列表）
      personalizedMV: [], // 推荐MV
      newMusic: [] // 最新音乐
    };
  },
  mounted() {
    this.requestcarouselImages();
    console.log('123');
  },
  methods: {
    requestcarouselImages() {
      // 获取轮播列表
      HomePageService.getDiscover().then((data: any) => {
        const images = data.blocks[0]?.extInfo?.banners || [];
        this.carouselImages = images;
      });
    },
    handleClickHeaderItem(activeHeaderItem: any) {
      this.activeHeaderItem = activeHeaderItem;
    },

    // 点击推荐歌单
    handleClickSongSheet(songSheet: any) {
      // history.push({
      //   pathname: '/home/songSheet',
      //   params: `id=${songSheet.id}`
      // });
      // 跳转到对应的歌单
      console.log('handleClickSongSheet');
    }
  }
});
</script>

<style lang="scss" scoped>
.discover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 10px 0;
  .header_item {
    margin: 0 10px;
    cursor: pointer;
  }
  .active_header_item {
    color: #000;
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 80%;
      height: 4px;
      left: 50%;
      bottom: -10px;
      background-color: #ec4141;
      transform: translateX(-50%);
      border-radius: 4px;
    }
  }
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 30px;
  .image_box {
    min-height: 360px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-self: center;
    align-self: center;
    grid-column-gap: 14px;
    grid-row-gap: 14px;
  }
  // 独家放送

  .three_image_box {
    min-height: 160px;
    display: grid;
    grid-template-columns: repeat(3, calc(33.3% - 10px));
    justify-self: center;
    align-self: center;
    grid-column-gap: 14px;
    grid-row-gap: 14px;
  }
  .image {
    font-size: 7px;
  }
}
</style>
