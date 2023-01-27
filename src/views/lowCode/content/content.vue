<template>
  <div class="low-code-centent" @click="clickEvent">
    <ContCanvas
      :datas="datas"
      :blocksPos="blocksPos"
      :nearGuidelines="nearGuidelines"
      :userImages="userImages"
      :userVideos="userVideos"
      @updateDatas="updateDatas"
      @updateEditBlocksId="updateEditBlocksId"
      @updateBlocksPos="updateBlocksPos"
      @changeBlocksPos="changeBlocksPos"
      @deleteBlocksById="deleteBlocksById"
      @updateNearGuidelines="updateNearGuidelines"
      @blocksMove="blocksMove"
      @getDatas="getImgOrVideo"
      @deleteData="deleteImgOrVideo"
    ></ContCanvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { ContCanvas } from "@/components/lowCode/index"
import { useStore } from "@/store"

export default defineComponent({
  name: "Content",
  components: {
    ContCanvas,
  },
  setup() {
    const store = useStore()
    let datas = computed(() => store.getters["LowCodeModule/getModuleDatas"])
    let blocksPos = computed(() => store.getters["LowCodeModule/getModuleNearPosition"])
    let nearGuidelines = computed(() => store.getters["LowCodeModule/getNearGuidelines"])
    let userImages = computed(() => store.getters["LowCodeModule/getUserImages"])
    let userVideos = computed(() => store.getters["LowCodeModule/getUserVideos"])
    const updateDatas = (value: any) => {
      store.commit("LowCodeModule/changeModuleDatas", value)
    }
    const updateEditBlocksId = (values: { type: string; id: string }) => {
      store.dispatch("LowCodeModule/editBlocksId", values)
    }
    const updateBlocksPos = (values: { pos: Array<number>; id: string }) => {
      store.dispatch("LowCodeModule/editBlocksNearPos", {
        type: "update",
        pos: values.pos,
        id: values.id,
      })
    }
    const updateNearGuidelines = (values: Array<any>) => {
      store.commit("LowCodeModule/changeNearGuidelines", values)
    }
    const blocksMove = (value: object) => {
      store.dispatch("LowCodeModule/blocksMove", value)
    }
    // 修改 bolcks 的位置信息
    const changeBlocksPos = (values: object) => {
      store.commit("LowCodeModule/changeBlocksPosition", values)
    }
    // 删除选中的 blocks
    const deleteBlocksById = () => {
      store.commit("LowCodeModule/deleteBlocksById")
    }
    // 当点击空白处时，所有 blocks 的 focus 变为 false
    const clickEvent = () => {
      store.dispatch("LowCodeModule/editBlocksId", { type: "empty", id: null })
    }
    // 获取 ContCanvas - Dialog 的 images
    const getImgOrVideo = (type: string) => {
      store.dispatch("LowCodeModule/getUserImgOrVideo", type)
    }
    const deleteImgOrVideo = (values: { id: string; type: string }) => {
      store.dispatch("LowCodeModule/deleteUserImgOrVideo", values)
    }
    return {
      datas,
      blocksPos,
      nearGuidelines,
      userImages,
      userVideos,
      updateDatas,
      updateEditBlocksId,
      updateBlocksPos,
      blocksMove,
      clickEvent,
      changeBlocksPos,
      deleteBlocksById,
      updateNearGuidelines,
      getImgOrVideo,
      deleteImgOrVideo,
    }
  },
})
</script>

<style lang="less" scoped>
.low-code-centent {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
