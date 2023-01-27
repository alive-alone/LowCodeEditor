<template>
  <div class="add-element">
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
    const title = ["为你推荐", "基础装饰"]
    const images = [
      [
        "https://gd-ai-application.dancf.com/temp/7a5eae401a56fc3f1a0fe60b58ae0179.png",
        "https://gd-ai-application.dancf.com/temp/8d32ff2da9593025c381c67326626e53.png",
        "https://gd-ai-application.dancf.com/temp/66ec2244ff2bdf0a5fb5daee416a88e4.png",
      ],
      [
        "https://st-gdx.dancf.com/gaodingx/0/personal/my-tasks/20210423-141202-a72e.png",
        "https://st-gdx.dancf.com/gaodingx/0/personal/my-tasks/20210423-141137-406c.png",
        "https://gd-ai-application.dancf.com/temp/ee2952f51ea98f7fc2dd22349fefb319.png",
        "https://gd-ai-application.dancf.com/temp/5d8a6e5276d32e36540aa9826850bf25.png",
        "https://st0.dancf.com/02/material_uploader/202009101109-b2aa.png",
        "https://st0.dancf.com/02/cms/202207200223-5f49.png?x-oss-process=image/format,webp",
        "https://gd-ai-application.dancf.com/temp/c38cb6cfad39cb19a4787f2b3bef93fc.png",
        "https://gd-ai-application.dancf.com/temp/ac7c607e37bce5653e510142be713850.png",
        "https://gd-ai-application.dancf.com/temp/61b7783299b9311062e48a7a81c18aef.png",
        "https://gd-ai-application.dancf.com/temp/0483b81549a3cd306d98ec8cbe1ec24a.png",
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
.add-element {
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
