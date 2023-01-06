<template>
  <div class="low-code">
    <el-container class="el-container">
      <el-header height="30px">Header</el-header>
      <el-container class="main-container">
        <LeftMenu></LeftMenu>
        <div class="collapse">
          <CollapsePanel></CollapsePanel>
        </div>
        <el-main class="el-main">
          <Content></Content>
        </el-main>
        <el-aside width="276px">
          <RightMenu></RightMenu>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import LeftMenu from "./leftMenu/LeftMenu.vue"
import Content from "./content/content.vue"
import RightMenu from "./rightMenu/RightMenu.vue"
import { CollapsePanel } from "@/components/collapsePanel/index"

export default defineComponent({
  name: "LowCode",
  components: {
    LeftMenu,
    Content,
    RightMenu,
    CollapsePanel,
  },
})
</script>

<style lang="less" scoped>
.low-code {
  height: 100%;
  overflow: hidden;
  .el-container {
    height: 100%;
    padding: 0;
    overflow: hidden;
    .main-container {
      position: relative;
      padding: 0;
    }
    .el-main {
      background-color: #f0f3f4;
      padding: 0;
      height: 100%;
      position: relative;
    }
    .collapse {
      position: absolute;
      top: 0;
      left: 65px;
      width: 328px;
      height: 100%;
      background-color: rgb(255, 255, 255);
      border-left: 1px solid #eef2f8;
      z-index: 6;
    }
  }
}
</style>
