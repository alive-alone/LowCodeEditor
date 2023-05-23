<template>
  <div class="box" :style="externalStyle">
    <div
      draggable
      class="drag-box"
      ref="blockRef"
      :title="attbutes.title"
      :class="attbutes.className"
      @mousedown="mouseDownFunc"
    >
      <Mapping :styleValue="insideStyle" :attbutes="attbutes" :typeKey="block.key"></Mapping>
    </div>
    <template v-if="focus">
      <div :style="focusBox" :class="{ 'focus-box': true, 'focus-box-drag': dragging }">
        <!-- 左下角拉伸 -->
        <i
          class="editor-grip editor-grip-sw"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'sw')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 左拉伸 -->
        <i
          class="editor-grip editor-grip-w"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'w')"
          @mousedown.stop
        >
          <b class="strip"></b>
        </i>
        <!-- 左上角拉伸 -->
        <i
          class="editor-grip editor-grip-nw"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'nw')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>

        <!-- 右上角拉伸 -->
        <i
          class="editor-grip editor-grip-ne"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'ne')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 右拉伸 -->
        <i
          class="editor-grip editor-grip-e"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'e')"
          @mousedown.stop
        >
          <b class="strip"></b>
        </i>
        <!-- 右下角拉伸 -->
        <i
          class="editor-grip editor-grip-se"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'se')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 上拉伸 -->
        <i
          v-if="block.key === 'img'"
          class="editor-grip editor-grip-n"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 'n')"
          @mousedown.stop
        >
          <b class="horiz"></b>
        </i>
        <!-- 下拉伸 -->
        <i
          v-if="block.key === 'img'"
          class="editor-grip editor-grip-s"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, block, 's')"
          @mousedown.stop
        >
          <b class="horiz"></b>
        </i>
        <i
          class="editor-rotator editor-transition"
          @mousedown.prevent="mouseRotate($event, block)"
          @mousedown.stop
          :style="{ transform: `rotate(${-block.rotate}deg)` }"
        >
          <!-- <b style="transform: matrix(1, 0, 0, 1, 0, 0)">
            <span style="display: none">0°</span>
          </b> -->
          <svg-icon iconName="rotate" className="rotate"></svg-icon>
          <span class="rotate-value" :style="{ display: isRotate ? '' : 'none' }">
            {{ block.rotate }}°
          </span>
        </i>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue"
import type { Ref } from "vue"

import Mapping from "./Mapping.vue"
import SvgIcon from "@/components/common/SvgIcon.vue"

export default defineComponent({
  name: "RenderBlock",
  components: {
    Mapping,
    SvgIcon,
  },
  emits: ["draggingState"],
  props: {
    block: {
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
  setup(props, ctx) {
    // 是否正在旋转
    let isRotate = ref(false)
    const blockCenterPos = reactive({
      x: 0,
      y: 0,
    })
    let blockRef = ref<any>(null)
    //外部基本样式
    const externalStyle: Ref<any> = computed(() => ({
      position: "absolute",
      left: `${props.block.left}px`,
      top: `${props.block.top}px`,
      zIndex: props.block.zIndex,
      userSelect: props.block.userSelect ? props.block.userSelect : "",
      cursor: props.block.cursor ? props.block.cursor : "",
      width: `${
        props.block.key !== "img" ? props.block.width : props.block.width ? props.block.width : 50
      }px`,
      height: `${
        props.block.key !== "img"
          ? props.block.height
          : props.block.height
          ? props.block.height
          : 50
      }px`,
      transform: `rotate(${props.block.rotate}deg)`,
    }))
    // 内部基本样式
    const insideStyle: Ref<any> = computed(() => ({
      width: `${
        props.block.key !== "img"
          ? props.block.width - 10
          : props.block.width
          ? props.block.width
          : 50
      }px`,
      height: `${
        props.block.key !== "img"
          ? props.block.height
          : props.block.height
          ? props.block.height
          : 50
      }px`,
      display: `${props.block.display}`,
      color: `${props.block.color}`,
      fontSize: `${props.block.fontSize}px`,
      // `${props.block.padding}px` computedPaddding(props.block.padding)
      padding: computedPaddding(props.block.padding),
      background: `${props.block.background}`,
      borderWidth: `${props.block.borderWidth}px`,
      borderColor: `${props.block.borderColor}`,
      borderType: `${props.block.borderType}`,
      borderRadius: `${props.block.borderRadius}px`,
      textAlign: `${props.block.textAlign}`,
      lineHeight: props.block.lineHeight ? `${props.block.lineHeight}px` : "",
      boxShadow: `${props.block.boxShadow}`,
      fontFamily: `${props.block.fontFamily}`,
      fontWeight: `${props.block.fontWeight}`,
      fontStyle: `${props.block.fontStyle}`,
      opacity: props.block.opacity,
      zIndex: 1,
    }))
    // 标签属性
    const attbutes: Ref<any> = computed(() => ({
      className: `${props.block.class ? props.block.class : ""}`,
      text: `${props.block.text ? props.block.text : ""}`,
      title: `${props.block.title ? props.block.title : ""}`,
      placeholder: `${props.block.placeholder ? props.block.placeholder : ""}`,
      type: `${props.block.type ? props.block.type : ""}`,
      src: `${props.block.src ? props.block.src : ""}`,
      alt: `${props.block.alt ? props.block.alt : ""}`,
    }))
    const focusBox: Ref<any> = computed(() => ({
      width: `${
        props.block.key !== "img" ? props.block.width : props.block.width ? props.block.width : 50
      }px`,
      height: `${
        props.block.key !== "img"
          ? props.block.height
          : props.block.height
          ? props.block.height
          : 50
      }px`,
      // position: "reactive",
      // left: `${props.blocks.left}px`,
      // top: `${props.blocks.top}px`,
    }))
    const computedPaddding = (str: string) => {
      let arr = str.split(" ")
      return arr
        .map((item) => {
          return `${item}px`
        })
        .join(" ")
    }
    const mouseDownFunc = (event: any) => {
      const box = event.target.getBoundingClientRect() as DOMRect
      blockCenterPos.x = box.left + box.width / 2
      blockCenterPos.y = box.top + box.height / 2
    }
    // 鼠标边框缩放
    const mouseZoom = (event: MouseEvent, block: any, type: string) => {
      block.focus = true
      block.dragging = true
      ctx.emit("draggingState", true)
      document.onmousemove = (e) => {
        let scaleVal = e.movementX / (block.width / block.height)
        if (type === "sw") {
          block.width -= e.movementX
          block.height -= scaleVal
          block.left += e.movementX
        } else if (type === "nw") {
          block.width -= e.movementX
          block.height -= scaleVal
          block.top += scaleVal
          block.left += e.movementX
        } else if (type === "ne") {
          block.width += e.movementX
          block.height += scaleVal
          block.top -= scaleVal
        } else if (type === "se") {
          block.width += e.movementX
          block.height += scaleVal
        } else if (type === "e") {
          block.width += e.movementX
        } else if (type === "w") {
          block.width -= e.movementX
          block.left += e.movementX
        } else if (type === "n") {
          block.height -= e.movementY
          block.top += e.movementY
        } else if (type === "s") {
          block.height += e.movementY
        }
        if (block.key === "text") {
          if (block.fontSize > 9) {
            block.lineHeight = block.height
            block.fontSize = (0.8 * block.height).toFixed(1)
          }
        }
      }
      document.onmouseup = function () {
        block.dragging = false
        ctx.emit("draggingState", false)
        document.onmousemove = document.onmouseup = null
      }
    }
    // 鼠标旋转
    const mouseRotate = (event: MouseEvent, block: any) => {
      block.focus = true
      block.dragging = true
      isRotate.value = true
      ctx.emit("draggingState", true)
      const stopover = {
        x: event.pageX,
        y: event.pageY,
      }
      let rotate = block.rotate
      document.onmousemove = (e: MouseEvent) => {
        const movepoint = {
          x: e.pageX,
          y: e.pageY,
        }
        let aSquare = (stopover.x - movepoint.x) ** 2 + (stopover.y - movepoint.y) ** 2
        if (aSquare > 0) {
          let bSquare =
            (blockCenterPos.x - movepoint.x) ** 2 + (blockCenterPos.y - movepoint.y) ** 2
          let cSquare = (blockCenterPos.x - stopover.x) ** 2 + (blockCenterPos.y - stopover.y) ** 2
          let cosA = (bSquare + cSquare - aSquare) / (2 * Math.sqrt(bSquare) * Math.sqrt(cSquare))
          let arccosA = Math.round((Math.acos(cosA) * 180) / Math.PI)
          let direct =
            (movepoint.x - blockCenterPos.x) * (stopover.y - blockCenterPos.y) -
            (movepoint.y - blockCenterPos.y) * (stopover.x - blockCenterPos.x)
          if (direct > 0) {
            block.rotate = (rotate - arccosA) % 360
          } else {
            block.rotate = (rotate + arccosA) % 360
          }
        }
      }
      document.onmouseup = function () {
        block.dragging = false
        isRotate.value = false
        ctx.emit("draggingState", false)
        document.onmousemove = document.onmouseup = null
      }
    }
    return {
      isRotate,
      blockRef,
      externalStyle,
      insideStyle,
      attbutes,
      focusBox,
      mouseDownFunc,
      mouseZoom,
      mouseRotate,
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
  // display: block;
  // border: 2px solid #6ccfff;
  transform: matrix(1, 0, 0, 1, 0, 0);
  opacity: 1;
  transition: opacity 100ms;
  // margin: -2px 0 0 -2px;
  // margin: -1px 0;
  // position: relative;
  position: absolute;
  z-index: 5;
  box-sizing: border-box;
  cursor: move;
  .editor-grip {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
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
  .editor-grip-n {
    left: 50%;
    margin-top: -1px;
    cursor: ns-resize;
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
  .editor-grip-s {
    left: 50%;
    top: 100%;
    cursor: ns-resize;
  }
  .editor-rotator {
    cursor: url("https://cdn.dancf.com/odyssey-editor/img/ic_mouse_rotation_0.1c6c9df0.svg") 11 9,
      pointer;
  }
  .editor-transition {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 4;
    margin: 14px 0 0 -11px;
    // cursor: pointer;
    opacity: 1;
    .rotate {
      width: 20px;
      height: 20px;
      position: relative;
      z-index: 2;
      padding: 4px;
      border-radius: 50%;
      background-color: #ffffff;
      opacity: 1;
    }
    .rotate-value {
      position: absolute;
      top: 40px;
      left: 50%;
      height: 28px;
      padding: 0 8px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      color: #fff;
      background: #0e1217;
      border-radius: 4px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
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
  .horiz {
    width: 14px;
    height: 7px;
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
.focus-box::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  margin: -2px 0 0 -2px;
  border: 2px solid #6ccfff;
  content: "";
}
.focus-box-drag {
  b {
    opacity: 0;
  }
}
.focus-box-drag::before {
  opacity: 0.3;
  border: 2px solid #6ccfff;
}
</style>
