<template>
  <div class="collapse-panel">
    <AddText
      :style="{ display: activeIndex == 1 ? '' : 'none' }"
      @addTextClick="addTextClick"
    ></AddText>
    <AddElement
      :style="{ display: activeIndex == 2 ? '' : 'none' }"
      @addImageClick="addImageClick"
    ></AddElement>
    <AddImages
      :style="{ display: activeIndex == 3 ? '' : 'none' }"
      @addImageClick="addImageClick"
    ></AddImages>
    <AddVideo
      :style="{ display: activeIndex == 5 ? '' : 'none' }"
      @addVideoClick="addVideoClick"
    ></AddVideo>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

// import AddText from "./src/AddText.vue"
// import AddImage from "./src/AddImage.vue"
import { AddText, AddImages, AddElement, AddVideo } from "@/components/collapsePanel/index"

import { useStore } from "@/store"

export default defineComponent({
  name: "CollapsePanel",
  components: {
    AddText,
    AddImages,
    AddElement,
    AddVideo,
  },
  setup() {
    const store = useStore()
    const activeIndex = computed(() => store.getters["LowCodeModule/getActiveIndex"])
    const addTextClick = (type: string) => {
      store.dispatch("LowCodeModule/addText", type)
    }
    const addImageClick = (values: object) => {
      store.dispatch("LowCodeModule/addImage", values)
    }
    const addVideoClick = (values: object) => {
      store.dispatch("LowCodeModule/addVideo", values)
    }
    return {
      activeIndex,
      addTextClick,
      addImageClick,
      addVideoClick,
    }
  },
})
</script>
<style lang="less" scoped>
.collapse-panel {
  background-color: #ffffff;
}
</style>
