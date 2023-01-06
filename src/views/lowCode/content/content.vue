<template>
  <div class="low-code-centent" @click="clickEvent">
    <ContCanvas
      :datas="datas"
      :blocksPos="blocksPos"
      :nearGuidelines="nearGuidelines"
      @updateDatas="updateDatas"
      @updateEditBlocksId="updateEditBlocksId"
      @updateBlocksPos="updateBlocksPos"
      @changeBlocksPos="changeBlocksPos"
      @deleteBlocksById="deleteBlocksById"
      @updateNearGuidelines="updateNearGuidelines"
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
    const changeBlocksPos = (values: object) => {
      store.commit("LowCodeModule/changeBlocksPosition", values)
    }
    const deleteBlocksById = () => {
      store.commit("LowCodeModule/deleteBlocksById")
    }
    const clickEvent = () => {
      store.dispatch("LowCodeModule/editBlocksId", { type: "empty", id: null })
    }
    return {
      datas,
      blocksPos,
      nearGuidelines,
      updateDatas,
      updateEditBlocksId,
      updateBlocksPos,
      clickEvent,
      changeBlocksPos,
      deleteBlocksById,
      updateNearGuidelines,
    }
  },
})
</script>

<style lang="less" scoped>
.low-code-centent {
  width: 100%;
  height: 100%;
}
</style>
