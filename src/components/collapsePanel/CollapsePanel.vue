<template>
  <div class="collapse-panel">
    <AddText @addTextClick="addTextClick"></AddText>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import AddText from "./src/AddText.vue"

import { useStore } from "@/store"

export default defineComponent({
  name: "CollapsePanel",
  components: {
    AddText,
  },
  setup() {
    const store = useStore()
    const addTextClick = (type: string) => {
      store.dispatch("LowCodeModule/addText", type)
    }
    return {
      addTextClick,
    }
  },
})
</script>
<style lang="less" scoped>
.collapse-panel {
  background-color: #ffffff;
}
</style>
