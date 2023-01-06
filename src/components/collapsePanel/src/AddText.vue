<template>
  <div class="add-text">
    <span class="title">{{ title }}</span>
    <button class="add-text-btn add-text-btn-heading" @click="addText('heading')">添加标题</button>
    <button class="add-text-btn add-text-btn-subheading" @click="addText('subheading')">
      添加副标题
    </button>
    <button class="add-text-btn add-text-btn-text" @click="addText('text')">添加正文</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AddText",
  components: {},
  emits: ["addTextClick"],
  props: {
    title: {
      type: String,
      default: "文字",
    },
  },
  setup(props, emits) {
    const addText = (type: string) => {
      emits.emit("addTextClick", type)
    }
    return {
      addText,
    }
  },
})
</script>
<style lang="less" scoped>
.add-text {
  padding: 0 24px 14px;
  .title {
    position: relative;
    display: flex;
    margin: 16px 0 8px 0;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    user-select: none;
  }
  .add-text-btn {
    width: 100%;
    padding: 0;
    color: #000;
    background: #f1f2f4;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
  .add-text-btn-heading {
    height: 56px;
    font-size: 24px;
    font-weight: 600;
  }
  .add-text-btn-subheading {
    height: 48px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 8px;
  }
  .add-text-btn-text {
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
  }
}
</style>
