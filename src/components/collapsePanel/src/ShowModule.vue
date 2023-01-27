<template>
  <div class="show-module">
    <div class="show-mode-title">
      <span>{{ title }}</span>
      <div>
        <button class="show-module-btn">
          全部
          <SvgIcon class="btn-svg" iconName="right"></SvgIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "ShowModule",
  components: {},
  emits: [""],
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  setup() {
    return {}
  },
})
</script>
<style lang="less" scoped>
.show-module {
  .show-mode-title {
    font-size: 13px;
    color: #33383e;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
  .show-module-btn {
    color: #a0a0a0;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    cursor: pointer;
    .btn-svg {
      margin-left: 1px;
      width: 14px;
      height: 14px;
      fill: #a0a0a0;
    }
  }
}
</style>
