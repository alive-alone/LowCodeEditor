<template>
  <div class="box" :style="externalStyle">
    <div
      draggable
      class="drag-box"
      ref="blockRef"
      :title="attbutes.title"
      :class="attbutes.className"
    >
      <Mapping :styleValue="insideStyle" :attbutes="attbutes" :typeKey="blocks.key"></Mapping>
    </div>
    <template v-if="focus">
      <div :style="focusBox" :class="{ 'focus-box': true, 'focus-box-drag': dragging }">
        <i class="editor-grip editor-grip-sw" style="padding: 0px">
          <b class="spot"></b>
        </i>
        <i class="editor-grip editor-grip-w" style="padding: 0px">
          <b class="strip"></b>
        </i>
        <i class="editor-grip editor-grip-nw" style="padding: 0px">
          <b class="spot"></b>
        </i>
        <i class="editor-grip editor-grip-ne" style="padding: 0px">
          <b class="spot"></b>
        </i>
        <i class="editor-grip editor-grip-e" style="padding: 0px">
          <b class="strip"></b>
        </i>
        <i class="editor-grip editor-grip-se" style="padding: 0px">
          <b class="spot"></b>
        </i>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import type { Ref } from "vue"

import Mapping from "./Mapping.vue"

export default defineComponent({
  name: "RenderBlock",
  components: {
    Mapping,
  },
  props: {
    blocks: {
      type: Object as any,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    dragging: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let blockRef = ref<any>(null)
    //外部基本样式
    const externalStyle: Ref<any> = computed(() => ({
      position: "absolute",
      left: `${props.blocks.left}px`,
      top: `${props.blocks.top}px`,
      zIndex: props.blocks.zIndex,
      userSelect: props.blocks.userSelect ? props.blocks.userSelect : "",
      cursor: props.blocks.cursor ? props.blocks.cursor : "",
      width: `${
        props.blocks.key !== "img"
          ? props.blocks.width
          : props.blocks.width
          ? props.blocks.width
          : 50
      }px`,
      height: `${
        props.blocks.key !== "img"
          ? props.blocks.height
          : props.blocks.height
          ? props.blocks.height
          : 50
      }px`,
    }))
    // 内部基本样式
    const insideStyle: Ref<any> = computed(() => ({
      maxWidth: `${
        props.blocks.key !== "img"
          ? props.blocks.width - 10
          : props.blocks.width
          ? props.blocks.width
          : 50
      }px`,
      maxHeight: `${
        props.blocks.key !== "img"
          ? props.blocks.height
          : props.blocks.height
          ? props.blocks.height
          : 50
      }px`,
      display: `${props.blocks.display}`,
      color: `${props.blocks.color}`,
      fontSize: `${props.blocks.fontSize}px`,
      // `${props.blocks.padding}px` computedPaddding(props.blocks.padding)
      padding: computedPaddding(props.blocks.padding),
      background: `${props.blocks.background}`,
      borderWidth: `${props.blocks.borderWidth}px`,
      borderColor: `${props.blocks.borderColor}`,
      borderType: `${props.blocks.borderType}`,
      borderRadius: `${props.blocks.borderRadius}px`,
      textAlign: `${props.blocks.textAlign}`,
      lineHeight: props.blocks.lineHeight ? `${props.blocks.lineHeight}px` : "",
      boxShadow: `${props.blocks.boxShadow}`,
      fontFamily: `${props.blocks.fontFamily}`,
      fontWeight: `${props.blocks.fontWeight}`,
    }))
    // 标签属性
    const attbutes: Ref<any> = computed(() => ({
      className: `${props.blocks.class ? props.blocks.class : ""}`,
      text: `${props.blocks.text ? props.blocks.text : ""}`,
      title: `${props.blocks.title ? props.blocks.title : ""}`,
      placeholder: `${props.blocks.placeholder ? props.blocks.placeholder : ""}`,
      type: `${props.blocks.type ? props.blocks.type : ""}`,
      src: `${props.blocks.src ? props.blocks.src : ""}`,
      alt: `${props.blocks.alt ? props.blocks.alt : ""}`,
    }))
    const focusBox: Ref<any> = computed(() => ({
      width: `${
        props.blocks.key !== "img"
          ? props.blocks.width
          : props.blocks.width
          ? props.blocks.width
          : 50
      }px`,
      height: `${
        props.blocks.key !== "img"
          ? props.blocks.height
          : props.blocks.height
          ? props.blocks.height
          : 50
      }px`,
      position: "reactive",
      left: `${props.blocks.left}px`,
      top: `${props.blocks.top}px`,
    }))
    const computedPaddding = (str: string) => {
      let arr = str.split(" ")
      return arr
        .map((item) => {
          return `${item}px`
        })
        .join(" ")
    }
    return {
      blockRef,
      externalStyle,
      insideStyle,
      attbutes,
      focusBox,
    }
  },
})
</script>
<style lang="less" scoped>
.box {
  position: relative;
  border: none;
}
.drag-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
}
.focus-box {
  display: block;
  border: 1px solid #759fff;
  transform: matrix(1, 0, 0, 1, 0, 0);
  opacity: 1;
  transition: opacity 100ms;
  .editor-grip {
    position: absolute;
    transform: translate(-50%, -50%);
  }
  .editor-grip-sw {
    top: 100%;
    margin-top: 1px;
    margin-left: -1px;
    cursor: nesw-resize;
  }
  .editor-grip-w {
    cursor: ew-resize;
    top: 50%;
    left: 0;
    margin-left: -1px;
  }
  .editor-grip-nw {
    top: 0;
    left: 0;
    cursor: nwse-resize;
  }
  .editor-grip-ne {
    left: 100%;
    margin-top: -1px;
    margin-left: 1px;
    cursor: nesw-resize;
  }
  .editor-grip-e {
    top: 50%;
    left: 100%;
    margin-left: 1px;
    cursor: ew-resize;
  }
  .editor-grip-se {
    top: 100%;
    left: 100%;
    margin-top: 1px;
    margin-left: 1px;
    cursor: nwse-resize;
  }
  .spot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .strip {
    width: 7px;
    height: 11px;
    border-radius: 30%;
  }
  b {
    opacity: 1;
    display: block;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0 rgba(86, 90, 98, 0.8);
    background-color: rgb(255, 255, 255);
    transition: opacity 300ms;
  }
}
.focus-box-drag {
  opacity: 0.4;
  b {
    opacity: 0;
  }
}
</style>
