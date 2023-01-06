<template>
  <div class="right-menu">
    <StyleCompiler
      :editBlocks="editBlocks"
      @changeBlockContence="changeBlockContence"
    ></StyleCompiler>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { StyleCompiler } from "@/components/rightModule"

import { useStore } from "@/store"

export default defineComponent({
  name: "RightMenu",
  components: {
    StyleCompiler,
  },
  setup() {
    const store = useStore()
    let ids = computed(() => store.getters["LowCodeModule/getEditingBlocksId"])
    let datas = computed(() => store.getters["LowCodeModule/getModuleDatas"])
    let editBlocks = computed(() =>
      datas.value.filter((item: any) => {
        // console.log(ids.value.includes(item.id))
        return ids.value.includes(item.id) ? item : false
      })
    )
    const changeBlockContence = (content: object) => {
      store.commit("LowCodeModule/changeBlocksStyle", content)
    }
    return {
      datas,
      ids,
      editBlocks,
      changeBlockContence,
    }
  },
})
</script>
<style lang="less" scoped>
.right-menu {
  width: 100%;
  height: 100%;
}
</style>
