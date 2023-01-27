<template>
  <div class="left-menu">
    <LeftTabs
      :width="65"
      :tabs="tabs"
      :activeIndex="activeIndex"
      @changeActiveIndex="changeActiveIndex"
    ></LeftTabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store"

import { LeftTabs } from "@/components/leftModule"

export default defineComponent({
  name: "LeftMenu",
  components: {
    LeftTabs,
  },
  setup() {
    const store = useStore()
    let activeIndex = computed(() => store.getters["LowCodeModule/getActiveIndex"])
    const tabs = computed(() => store.getters["LowCodeModule/getLeftTabs"])
    const changeActiveIndex = (index: number) => {
      store.commit("LowCodeModule/changeActiveIndex", index)
    }
    return {
      activeIndex,
      tabs,
      changeActiveIndex,
    }
  },
})
</script>

<style lang="less" scoped>
.left-menu {
  height: 100%;
  width: 276px;
}
</style>
