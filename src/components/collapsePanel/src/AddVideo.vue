<template>
  <div class="add-image">
    <div class="imgs-module">
      <ShowModule :title="title[0]" class="add-img_title"> </ShowModule>
      <ShowVideos :videos="videos[0]" @selectImg="addImage"></ShowVideos>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import ShowModule from "./ShowModule.vue"
import ShowVideos from "./ShowVideos.vue"
import { BASE_URL } from "@/service/request/config"

export default defineComponent({
  name: "AddImage",
  components: {
    ShowModule,
    ShowVideos,
  },
  emits: ["addVideoClick"],
  props: {},
  setup(props, ctx) {
    const title = ["为你推荐"]
    const videos = [
      [
        `${BASE_URL}/public/show/videos/20190717195324.mp4`,
        `${BASE_URL}/public/show/videos/49801469240d458cba6bb02ea6645d59.mp4`,
      ],
    ]
    const addImage = (values: { src: string; scale: number }) => {
      ctx.emit("addVideoClick", { src: values.src, scale: values.scale })
    }
    return {
      title,
      videos,
      addImage,
    }
  },
})
</script>
<style lang="less" scoped>
.add-image {
  padding: 14px 24px;
  // background-color: antiquewhite;
  .imgs-module {
    margin-bottom: 28px;
  }
  .add-img_title {
    margin-bottom: 12px;
  }
}
/**
    height: 111.472px;
    width: 255.767px;
    left: 85.2555px;
    top: 420.523px;
    transform: matrix(1, 0, 0, 1, 0, 0);

*/
</style>
