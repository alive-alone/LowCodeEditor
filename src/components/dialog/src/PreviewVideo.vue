<template>
  <div tabindex="-1" class="image-viewer__wrapper" style="z-index: 2015">
    <div class="image-viewer__mask"></div>
    <div class="image-viewer__canvas" :style="{ transform: `scale(${canvasScale})` }">
      <video id="video" controls :src="src"></video>
    </div>
    <span class="image-viewer__btn image-viewer__close" @click="closePreview">
      <i class="icon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path>
        </svg>
      </i>
    </span>
    <span class="image-viewer__btn image-viewer__prev">
      <i class="icon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
          ></path>
        </svg>
      </i>
    </span>
    <span class="image-viewer__btn image-viewer__next">
      <i class="icon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
          ></path>
        </svg>
      </i>
    </span>
    <!-- <div class="image-viewer__btn image-viewer__actions">
      <div class="image-viewer__actions__inner">
        <i class="icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"
            ></path>
          </svg>
        </i>
        <i class="icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"
            ></path></svg></i
        ><i class="image-viewer__actions__divider"></i
        ><i class="icon"
          ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
            ></path></svg></i
        ><i class="image-viewer__actions__divider"></i
        ><i class="icon"
          ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
            ></path></svg></i
        ><i class="icon"
          ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
            ></path></svg
        ></i>
      </div>
    </div> -->
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue"

export default defineComponent({
  emits: ["changeIsShow"],
  props: {
    src: {
      type: String,
    },
  },
  setup(props, ctx) {
    let canvasScale = ref(1)
    const initVideo = () => {
      const video = document.getElementById("video")
      const clientHeight = document.body.clientHeight
      video.addEventListener("canplay", (e) => {
        canvasScale.value = (clientHeight / e.target.videoHeight).toFixed(2) - 0.05
      })
    }
    const closePreview = () => {
      ctx.emit("changeIsShow", false)
    }
    onMounted(() => {
      initVideo()
    })
    return {
      canvasScale,
      initVideo,
      closePreview,
    }
  },
})
</script>
<style scoped lang="less">
.image-viewer__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: slow 0.3s ease-out;
  .image-viewer__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
  }
  .image-viewer__canvas {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    user-select: none;
    transform: scale(1) rotate(0deg) translate(0px, 0px);
    max-height: 100%;
    max-width: 100%;
  }
  .image-viewer__btn {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
  }
  .image-viewer__close {
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    border-color: #fff;
    top: 40px;
    right: 40px;
    .icon {
      font-size: inherit;
      cursor: pointer;
    }
  }
  .image-viewer__prev {
    top: 50%;
    transform: translateY(-50%);
    left: 40px;
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    border-color: #fff;
  }
  .image-viewer__next {
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    text-indent: 2px;
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    border-color: #fff;
  }
  .image-viewer__actions {
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    width: 282px;
    height: 44px;
    padding: 0 23px;
    background-color: #606266;
    border-color: #fff;
    border-radius: 22px;
    .image-viewer__actions__inner {
      width: 100%;
      height: 100%;
      text-align: justify;
      cursor: default;
      font-size: 23px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .icon {
    --color: inherit;
    height: 1em;
    width: 1em;
    line-height: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;
    color: var(--color);
    font-size: inherit;
  }
}

@keyframes slow {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
