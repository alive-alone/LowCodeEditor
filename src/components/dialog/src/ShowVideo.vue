<template>
  <div class="show-video">
    <video class="video" @click="changeIsShow(true)">
      <source :src="src" />
    </video>
    <PreviewVideo v-if="isShowPreview" :src="src" @changeIsShow="changeIsShow"></PreviewVideo>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"

import PreviewVideo from "./PreviewVideo.vue"

export default defineComponent({
  components: {
    PreviewVideo,
  },
  props: {
    src: {
      type: String,
    },
  },
  setup() {
    let isShowPreview = ref(false)
    const changeIsShow = (value) => {
      isShowPreview.value = value
    }
    return {
      isShowPreview,
      changeIsShow,
    }
  },
})
</script>
<style scoped lang="less">
.show-video {
  .video {
    height: 160px;
    border-radius: 3px;
    cursor: pointer;
  }
}
</style>
