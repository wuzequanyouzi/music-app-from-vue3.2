<template>
  <div class="carousel">
    <div class="container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div
        class="default"
        :class="[switchClass(index), switching ? 'switching' : '']"
        v-for="(image, index) in carouselImages"
        :key="index"
      >
        <img class="imgContainer" :src="image?.pic" />
      </div>
    </div>
    <div class="dots" v-if="isShowDots">
      <div
        v-for="(imageInfo, index) in imageList"
        :key="index"
        class="dotItem"
        :class="{
          active: recordIndex === index
        }"
        @mouseenter="
          () => {
            handleMouseEnter();
            handleClickImageItem(index);
          }
        "
        @mouseleave="handleMouseLeave"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, withDefaults, watch, computed, nextTick } from 'vue';

const props = withDefaults(
  defineProps<{
    imageList: [];
    autoplay: boolean;
    delayTime: number;
    isShowDots: boolean;
  }>(),
  {
    imageList: () => [],
    autoplay: false,
    delayTime: 2000,
    isShowDots: true
  }
);

// 等差值
const diffValue = computed(() => {
  return props.imageList.length - 2;
});

// 轮播数组上一张图索引
const lastIndex = ref(0);
// 轮播数组当前图索引
const currentIndex = ref(1);
// 轮播数组下一张图索引
const nextIndex = ref(2);
// 记录索引
const recordIndex = ref(0);
// 轮播数组数据
const carouselImages = ref<any>([]);
// 转换过程标识
const switching = ref(false);

const autoplayAnimationFramer = ref<NodeJS.Timer | null>(null);
const timeoutFramer = ref<NodeJS.Timer | null>(null);
const autoPlayIndex = ref(0);

// 最后一次操作下标差是否超过1
const isMoreThanOne = ref(false);

/** 监听器 */
//
watch(
  () => props.imageList,
  () => {
    carouselImages.value = [...props.imageList.slice(-1), ...props.imageList.slice(0, 4)];
    if (carouselImages.value.length >= 5 && props.autoplay) {
      setTimeout(() => {
        autoPlay();
      }, 1000);
    }
  },
  {
    deep: true
  }
);

// methods
// 自动轮播回调
const animationFrameCallback = () => {
  autoPlayIndex.value = (autoPlayIndex.value + 1) % props.imageList.length;
  handleClickImageItem(autoPlayIndex.value);
};
// 自动轮播
const autoPlay = () => {
  cancelAutoPlay();
  autoplayAnimationFramer.value = setInterval(() => {
    animationFrameCallback();
  }, props.delayTime);
};
// 取消轮播
const cancelAutoPlay = () => {
  autoplayAnimationFramer.value && clearInterval(autoplayAnimationFramer.value);
};

// 点击下标事件
const handleClickImageItem = (_curIndex: number) => {
  if (_curIndex === recordIndex.value || switching.value) return;
  const imagesLength = props.imageList.length;
  const difference = _curIndex - recordIndex.value;
  // 记录索引
  recordIndex.value = _curIndex;
  switching.value = false;
  if (Math.abs(difference) > 1 && Math.abs(difference) < imagesLength - 1) {
    switching.value = true;
    isMoreThanOne.value = true;
    setTimeout(() => {
      // 重置轮播数组
      recalculation(_curIndex);
      currentIndex.value = 1;
      lastIndex.value = 0;
      nextIndex.value = 2;
      switching.value = false;
    }, 350);
  } else {
    let indexsObj: any = {};
    if (difference === 1 || difference === -(imagesLength - 1)) {
      indexsObj = computedNextIndexs(currentIndex.value);
    } else if (difference === -1 || difference === imagesLength - 1) {
      indexsObj = computedLastIndexs(currentIndex.value);
    }
    const { _lastIndex, _currentIndex, _nextIndex } = indexsObj;
    lastIndex.value = _lastIndex;
    currentIndex.value = _currentIndex;
    nextIndex.value = _nextIndex;

    // 隐藏的上一张图片在原数组中的下标
    const afterOneRemainder = (_curIndex + diffValue.value) % imagesLength;
    // 隐藏的上一张图片
    const afterOneImage = props.imageList[afterOneRemainder];
    // 隐藏的下一张图片在原数组中的下标
    const afterTwoRemainder = (_curIndex + 2) % imagesLength;
    // 隐藏的下一张图片
    const afterTwoImage = props.imageList[afterTwoRemainder];

    // 解决因切换下标差超过1而导致的再度递增切时轮播图片展示错误
    if (isMoreThanOne.value) {
      isMoreThanOne.value = false;
      if (difference === 1) {
        const nextImageIndex = (_curIndex + difference) % imagesLength;
        carouselImages.value[3] = props.imageList[nextImageIndex];
      } else {
        const lastImageIndex = (_curIndex + difference) % imagesLength;
        carouselImages.value[4] = props.imageList[lastImageIndex];
      }
    }

    // 替换轮播数组中隐藏的图片
    const carouseLength = carouselImages.value.length;
    if (lastIndex.value - 1 < 0) {
      carouselImages.value[carouseLength - 1] = afterOneImage;
    } else {
      carouselImages.value[lastIndex.value - 1] = afterOneImage;
    }
    if (nextIndex.value + 1 > carouseLength - 1) {
      carouselImages.value[0] = afterTwoImage;
    } else {
      carouselImages.value[nextIndex.value + 1] = afterTwoImage;
    }
  }
};

// 鼠标进入元素的事件回调
const handleMouseEnter = () => {
  props.autoplay && cancelAutoPlay();
};

// 鼠标离开元素的事件回调
const handleMouseLeave = () => {
  props.autoplay && autoPlay();
};

// 根据当前选中的索引重新生成轮播数组
const recalculation = (currentImageIndex: number) => {
  const imagesLength = props.imageList.length;
  const indexs = [
    (currentImageIndex + diffValue.value + 1) % imagesLength,
    currentImageIndex,
    (currentImageIndex + 1) % imagesLength,
    (currentImageIndex + diffValue.value) % imagesLength,
    (currentImageIndex + 2) % imagesLength
  ];
  const resultArr = indexs.map(index => {
    return props.imageList[index];
  });
  carouselImages.value = resultArr;
};

// 计算转到上一张图时，各个下标
const computedLastIndexs = (currentIndex: number) => {
  let _nextIndex = currentIndex;
  let _currentIndex = currentIndex - 1;
  let _lastIndex = null;
  if (_currentIndex < 0) {
    _currentIndex = 4;
  }
  if (_currentIndex === 0) {
    _lastIndex = 4;
  } else {
    _lastIndex = _currentIndex - 1;
  }
  return {
    _nextIndex,
    _currentIndex,
    _lastIndex
  };
};

// 计算转到下一张图时，各个下标
const computedNextIndexs = (currentIndex: number) => {
  let _lastIndex = currentIndex;
  let _currentIndex = currentIndex + 1;
  let _nextIndex = null;
  if (_currentIndex > 4) {
    _currentIndex = 0;
  }
  if (_currentIndex === 4) {
    _nextIndex = 0;
  } else {
    _nextIndex = _currentIndex + 1;
  }
  return {
    _lastIndex,
    _currentIndex,
    _nextIndex
  };
};

// 判断下标
const switchClass = (index: number) => {
  let className = '';
  switch (index) {
    case lastIndex.value:
      className = 'left';
      break;

    case currentIndex.value:
      className = 'center';
      break;

    case nextIndex.value:
      className = 'right';
      break;

    default:
      className = 'after';
      break;
  }
  return className;
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  min-width: 760px;
  max-width: 1200px;
  height: 240px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 800px;
    display: flex;
    position: relative;
    .default {
      width: 540px;
      height: 100%;
      overflow: hidden;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
      position: absolute;
      left: 50%;
      transform: translateX(-50%) scale(0.6);
      transition: all 0.5s;
      z-index: 0;
      border-radius: 10px;
    }

    .left {
      z-index: 1;
      left: 0 !important;
      transform-origin: 0 50%;
      transform: scale(0.8);
    }

    .center {
      z-index: 3;
      transform: translateX(-50%) scale(1);
    }

    .right {
      z-index: 2;
      left: unset;
      right: 0 !important;
      transform-origin: 100% 50%;
      transform: scale(0.8);
    }
    .after {
      z-index: 0;
      left: 50%;
      transform: translateX(-50%) scale(0.6);
    }

    .switching {
      left: 50% !important;
      transform-origin: 50% 50% !important;
      transform: translateX(-50%) scale(0.8) !important;
    }
  }
}

.default {
  transform: translateX(-50%) scale(0.6);
}

.imgContainer {
  width: 100%;
  height: 100%;
}

.dots {
  width: 80%;
  height: 20px;
  // background-color: #AAA;
  display: flex;
  justify-content: center;
  align-items: center;
  .dotItem {
    width: 6px;
    height: 6px;
    background-color: #ccc;
    border-radius: 3px;
    margin: 0 6px;
    cursor: pointer;
  }
  .active {
    background-color: #c73e3e;
  }
}
</style>
