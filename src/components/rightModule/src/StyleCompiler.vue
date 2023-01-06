<template>
  <div class="style-compiler">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="文字" name="base">
        <FontStyle :editBlocks="editBlocks" @changeBlockStyle="changeBlockStyle"></FontStyle>
      </el-tab-pane>
      <el-tab-pane label="动画" name="animation">动画</el-tab-pane>
      <el-tab-pane label="交互" name="event">交互</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import FontStyle from "./FontStyle.vue"

export default defineComponent({
  name: "StyleCompiler",
  components: {
    FontStyle,
  },
  emits: ["changeBlockContence"],
  props: {
    editBlocks: {
      type: Array,
    },
  },
  setup(props, ctx) {
    let activeName = ref("base")
    let changeBlockStyle = (values: object) => {
      ctx.emit("changeBlockContence", values)
    }
    return {
      activeName,
      changeBlockStyle,
    }
  },
})
</script>
<style lang="less" scoped>
.style-compiler {
  height: 100%;
  padding: 0 24px;
  .demo-tabs {
    height: 100%;
    font-size: 14px;
    ::v-deep(.el-tabs__content) {
      overflow: none;
    }
  }
}
</style>
