<template>
  <div class="cont-canvas">
    <div class="canvas-body">
      <div class="content-canvas" id="canvas">
        <!-- <div
          draggable
          id="title"
          class="draggable"
          :style="{ top: `${location.top}px`, left: `${location.left}px` }"
        >
          <div style="background-color: #fff; width: 100px">
            <span>一级标题</span>
          </div>
        </div>
                    @blur="blurFunc(block)"
        -->
        <template v-for="block in blocks" :key="block.id">
          <RenderBlock
            tabindex="0"
            :blocks="block"
            :focus="block.focus"
            :dragging="block.dragging"
            @mousedown="mousedownFunc($event, block)"
            @mouseenter="mouseenterFunc(block)"
            @mouseleave="mouseleaveFunc"
            @mouseup="mouseupFunc"
            @click.stop
          >
          </RenderBlock>
        </template>
        <div :style="mouseenterBox" class="mouseenter-box"></div>
        <template v-if="isDragging">
          <div
            v-for="item in nearGuidelines"
            :key="`${item[0]}${item[1]}${item[2]}${item[3]}`"
            class="guidelines"
            :style="{
              left: `${item[0]}px`,
              top: `${item[1]}px`,
              width: `${item[2]}px`,
              height: `${item[3]}px`,
            }"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import type { Ref } from "vue"

import RenderBlock from "./RenderBlock.vue"
import { computedNearBlockcs } from "@/assets/ts/lowCode/mouseEvent"

export default defineComponent({
  name: "",
  components: {
    RenderBlock,
  },
  emits: [
    "updateDatas",
    "updateEditBlocksId",
    "changeBlocksPos",
    "deleteBlocksById",
    "updateBlocksPos",
    "updateNearGuidelines",
  ],
  props: {
    datas: {
      type: Array,
    },
    blocksPos: {
      type: Object,
    },
    nearGuidelines: {
      type: Array,
    },
  },
  setup(props, ctx) {
    const keyboardState = reactive({
      ctrlKey: false,
    })
    let isDragging = ref(false)
    let mouseenterBox = reactive({
      display: "none",
      position: "",
      width: "0px",
      height: "0px",
      top: "0px",
      left: "0px",
    })
    let blocks: Ref<any> = computed({
      get() {
        return props.datas
      },
      set(value) {
        console.log(value)
        ctx.emit("updateDatas", value)
      },
    })
    let blocksPos: Ref<any> = computed({
      get() {
        return props.blocksPos
      },
      set(value) {
        ctx.emit("updateBlocksPos", value)
      },
    })
    const mousedownFunc = (event: MouseEvent, box: any) => {
      isDragging.value = true
      if (keyboardState.ctrlKey) {
        ctx.emit("updateEditBlocksId", { type: "add", id: box.id })
      } else {
        ctx.emit("updateEditBlocksId", { type: "change", id: box.id })
      }
      mouseDown(event, box, blocksPos.value)
      mouseleaveFunc()
    }
    const mouseupFunc = () => {
      isDragging.value = false
    }
    const mouseenterFunc = (block: any) => {
      if (block.focus || isDragging.value) {
        mouseleaveFunc()
      } else {
        mouseenterBox.display = ""
        mouseenterBox.position = "absolute"
        mouseenterBox.left = `${block.left}px`
        mouseenterBox.top = `${block.top}px`
        mouseenterBox.width = `${block.width}px`
        mouseenterBox.height = `${block.height}px`
      }
    }
    const mouseleaveFunc = () => {
      mouseenterBox.display = "none"
    }
    const blurFunc = (block: any) => {
      block.focus = false
      ctx.emit("updateEditBlocksId", { type: "delete", id: block.id })
    }
    const mouseDown = (event: MouseEvent, block: any, position: any) => {
      const startPos = reactive({
        top: 10,
        left: 10,
      })
      block.focus = true
      startPos.top = block.top
      startPos.left = block.left
      const x1 = event.clientX
      const y1 = event.clientY
      document.onmousemove = (e) => {
        block.dragging = true
        const x2 = e.clientX
        const y2 = e.clientY
        const computedTop = y2 - y1 + startPos.top
        const computedLeft = x2 - x1 + startPos.left
        const { difLeft, difTop, guidelines } = computedNearBlockcs(
          position,
          computedTop,
          computedLeft,
          block.width,
          block.height,
          block.id
        )
        block.top = computedTop + difTop
        block.left = computedLeft + difLeft
        const pos = [
          block.left,
          block.left + block.width / 2,
          block.left + block.width,
          block.top,
          block.top + block.height / 2,
          block.top + block.height,
        ]
        position[block.id] = pos
        ctx.emit("updateNearGuidelines", guidelines)
      }
      startPos.top = block.top
      startPos.left = block.left
      document.onmouseup = function () {
        block.dragging = false
        document.onmousemove = document.onmouseup = null
      }
    }
    onMounted(() => {
      document.onkeydown = (event) => {
        // 判断ctrl按键是否被按
        keyboardState.ctrlKey = event.ctrlKey
        // 监听删除键
        if (event.code === "Delete") {
          ctx.emit("deleteBlocksById")
        }
        // 监听上下左右键
        if (event.code === "ArrowLeft") {
          ctx.emit("changeBlocksPos", { type: "left", speed: 1 })
        } else if (event.code === "ArrowRight") {
          ctx.emit("changeBlocksPos", { type: "right", speed: -1 })
        } else if (event.code === "ArrowUp") {
          ctx.emit("changeBlocksPos", { type: "up", speed: 1 })
        } else if (event.code === "ArrowDown") {
          ctx.emit("changeBlocksPos", { type: "down", speed: -1 })
        }
      }
      document.onkeyup = (event) => {
        // 判断ctrl按键是否被按
        keyboardState.ctrlKey = event.ctrlKey
      }
    })
    return {
      isDragging,
      blocks,
      mouseenterBox,
      mousedownFunc,
      mouseupFunc,
      mouseenterFunc,
      mouseleaveFunc,
      blurFunc,
    }
  },
})
</script>

<style lang="less" scoped>
.cont-canvas {
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .canvas-body {
    padding: 30px;
    .content-canvas {
      width: 460.197px;
      height: 830.101px;
      background-color: rgb(234, 234, 234);
      position: relative;
      border: none;
      .mouseenter-box {
        border: 1px solid #759fff;
      }
      .guidelines {
        position: absolute;
        width: 100px;
        height: 1px;
        background-color: #ea56ff;
        top: 500px;
        left: 150px;
      }
    }
  }
}
</style>
