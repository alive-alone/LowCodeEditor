<template>
  <div class="tabs" :style="{ width: `${width}px` }">
    <div class="tab-content">
      <div
        class="tab-item"
        v-for="item in tabs"
        :key="item.id"
        :class="{ 'tab-active': activeIndex === item.id }"
        @click="changeActiveIndex(item.id)"
      >
        <SvgIcon
          class="icon"
          :class="{ 'icon-active': activeIndex === item.id }"
          :icon-name="item.icon"
        ></SvgIcon>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "",
  components: {},
  emits: ["changeActiveIndex"],
  props: {
    width: {
      type: Number,
      default: 65,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
    },
  },
  setup(props, ctx) {
    const changeActiveIndex = (index: number) => {
      ctx.emit("changeActiveIndex", index)
    }
    return {
      changeActiveIndex,
    }
  },
})
</script>

<style lang="less" scoped>
// icon 配色 #515151
.tabs {
  width: 65px;
  height: 100%;
  background-color: rgb(255, 255, 255);
  .tab-content {
    .tab-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 14px 0;
      color: var(--icon-color);
      cursor: pointer;
      .icon {
        width: 25px;
        height: 25px;
        fill: var(--icon-color);
      }
      .icon-active {
        fill: var(--icon-active-color);
      }
      span {
        font-size: 12px;
      }
    }
    .tab-active {
      color: var(--icon-active-color);
    }
    .tab-item::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 3px;
      height: 40px;
      background-color: var(--icon-active-color);
      border-radius: 0 1px 1px 0;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      opacity: 0;
    }
    .tab-item:hover::before {
      opacity: 1;
    }
    .tab-active::before {
      opacity: 1;
    }
  }
}
</style>
