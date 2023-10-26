<template>
  <div class="show-video">
    <ul class="show-video_ul">
      <li class="show-video_li">
        <div class="video-box" v-for="(item, index) in videos" :key="index">
          <video class="video-box_video" @click="selectIndex($event, item)" :src="item">
            <!-- <source :src="item" /> -->
          </video>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "ShowModule",
  components: {},
  emits: ["selectImg"],
  props: {
    videos: {
      type: Array,
    },
  },
  setup(props, ctx) {
    const selectIndex = (event: any, src: string) => {
      let element = event.target
      let scale = element.clientWidth / element.clientHeight
      ctx.emit("selectImg", { src, scale })
    }
    return {
      selectIndex,
    }
  },
})
</script>
<style lang="less" scoped>
.show-video {
  .show-video_ul {
    height: 91.9871px;
    margin: 0;
    padding: 0;
    .show-video_li {
      list-style: none;
      display: flex;
      justify-content: space-around;
      .video-box {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .video-box_video {
          height: 120px;
          background-color: #f8fafc;
        }
      }
    }
  }
}
</style>
