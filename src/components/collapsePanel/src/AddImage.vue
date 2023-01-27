<template>
  <div class="add-image">
    <div class="imgs-module">
      <ShowModule :title="title[0]" class="add-img_title"> </ShowModule>
      <ShowImages :images="images[0]" @selectImg="addImage"></ShowImages>
    </div>
    <div class="imgs-module">
      <ShowModule :title="title[1]" class="add-img_title"> </ShowModule>
      <ShowImages :images="images[1]" @selectImg="addImage"></ShowImages>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import ShowModule from "./ShowModule.vue"
import ShowImages from "./ShowImages.vue"

export default defineComponent({
  name: "AddImage",
  components: {
    ShowModule,
    ShowImages,
  },
  emits: ["addImageClick"],
  props: {},
  setup(props, ctx) {
    const title = ["为你推荐", "职场人士"]
    const images = [
      [
        "https://gd-filems.dancf.com/saas/xi19e5/0/aa8f3a67-8c9f-4be7-ae0c-ea757db7152910370.jpg",
        "https://gd-filems.dancf.com/saas/xi19e5/0/5c6e2c57-17cb-4adb-9a25-e00231774dff470.png",
      ],
      [
        "https://gd-filems.dancf.com/gaoding/gaoding/2269/d6898380-e0ee-4956-9534-f4526997bbc16558.jpeg",
        "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      ],
    ]
    const addImage = (values: { src: string; scale: number }) => {
      ctx.emit("addImageClick", { src: values.src, scale: values.scale })
    }
    return {
      title,
      images,
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
