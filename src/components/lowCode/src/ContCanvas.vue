<template>
  <div class="cont-canvas">
    <div class="canvas-body" id="canvasBody" :style="{ transform: `scale(${canvasScale})` }">
      <!-- <div class="canvas-body" id="canvasBody"> -->
      <div class="content-canvas" id="canvas">
        <template v-for="block in blocks" :key="block.id">
          <RenderBlock
            tabindex="0"
            :block="block"
            :focus="block.focus"
            :dragging="block.dragging"
            @mousedown.prevent="mousedownFunc($event, block)"
            @mouseenter="mouseenterFunc(block)"
            @mouseleave="mouseleaveFunc"
            @mouseup="mouseupFunc"
            @click.stop
            @dblclick="dblclickFunction(block)"
            @draggingState="changeIsDragging"
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
    <Dialog
      :dialogVisible="dialogVisible"
      :datas="computedDatas"
      :type="dialogEditType"
      @changeDialogVisible="changeDialogVisible"
      @getDatas="getDatas"
      @deleteData="deleteData"
      @publishImage="publishImage"
    ></Dialog>
  </div>
  <!-- <button @click="exportAsPicture">click</button> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import type { Ref } from "vue"

import RenderBlock from "./RenderBlock.vue"
import { Dialog } from "@/components/dialog/index"
import { computedNearBlockcs } from "@/assets/ts/lowCode/mouseEvent"
import { debounce } from "@/assets/ts/lowCode/index"

import domtoimage from "dom-to-image"
// import html2canvas from "html2canvas"

export default defineComponent({
  name: "",
  components: {
    RenderBlock,
    Dialog,
  },
  emits: [
    "updateDatas",
    "updateEditBlocksId",
    "changeBlocksPos",
    "deleteBlocksById",
    "updateBlocksPos",
    "updateNearGuidelines",
    "blocksMove",
    "getDatas",
    "deleteData",
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
    userImages: {
      type: Array,
    },
    userVideos: {
      type: Array,
    },
  },
  setup(props, ctx) {
    // 按键状态 -- 是否被按下
    const keyboardState = reactive({
      ctrlKey: false,
    })
    // 是否正在拖拽
    let isDragging = ref(false)
    // 鼠标进入时的边框
    let mouseenterBox = reactive({
      display: "none",
      position: "",
      width: "0px",
      height: "0px",
      top: "0px",
      left: "0px",
      transform: `rotate(0deg)`,
    })
    // canvas 缩放比例
    let canvasScale = ref(1)
    // dialog 显示状态
    let dialogVisible = ref(false)
    // 代码块
    let blocks: Ref<any> = computed({
      get() {
        return props.datas
      },
      set(value) {
        console.log(value)
        ctx.emit("updateDatas", value)
      },
    })
    // 代码块位置信息
    let blocksPos: Ref<any> = computed({
      get() {
        return props.blocksPos
      },
      set(value) {
        ctx.emit("updateBlocksPos", value)
      },
    })
    // dialog 编辑的对象 -- 双击的对象
    let dialogEditBlock = ref<any>()
    // dialog 编辑对象的类型 -- block.key
    let dialogEditType = ref("img")
    // 修改 dialogVisible
    const changeDialogVisible = (value: boolean) => {
      dialogVisible.value = value
    }
    // 鼠标按下触发 -- 用于添加或删除 edit block 代码块
    const mousedownFunc = (event: MouseEvent, box: any) => {
      if (keyboardState.ctrlKey) {
        ctx.emit("updateEditBlocksId", { type: "add", id: box.id })
      } else {
        ctx.emit("updateEditBlocksId", { type: "change", id: box.id })
      }
      mouseDown(event, box, blocksPos.value)
      mouseleaveFunc()
    }
    const changeIsDragging = (value: boolean) => {
      isDragging.value = value
    }
    // 鼠标松开事件 -- 拖拽事件结束
    const mouseupFunc = () => {
      changeIsDragging(false)
    }
    // 鼠标进入事件
    const mouseenterFunc = (block: any) => {
      if (block.focus || isDragging.value) {
        mouseleaveFunc()
      } else {
        mouseenterBox.display = ""
        // mouseenterBox.position = "absolute"
        mouseenterBox.left = `${block.left}px`
        mouseenterBox.top = `${block.top}px`
        mouseenterBox.width = `${block.width}px`
        mouseenterBox.height = `${block.height}px`
        mouseenterBox.transform = `rotate(${block.rotate}deg)`
      }
    }
    // 鼠标离开事件
    const mouseleaveFunc = () => {
      mouseenterBox.display = "none"
    }
    // 失去焦点事件
    const blurFunc = (block: any) => {
      block.focus = false
      ctx.emit("updateEditBlocksId", { type: "delete", id: block.id })
    }
    // 鼠标按下事件
    const mouseDown = (event: MouseEvent, block: any, position: any) => {
      console.log(event)
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
        // 标记正在拖拽
        changeIsDragging(true)
        block.dragging = true
        const x2 = e.clientX
        const y2 = e.clientY
        const computedTop = (y2 - y1) / canvasScale.value + startPos.top
        const computedLeft = (x2 - x1) / canvasScale.value + startPos.left
        const { difLeft, difTop, guidelines } = computedNearBlockcs(
          position,
          computedTop,
          computedLeft,
          block.width,
          block.height,
          block.id
        )
        // let difY = computedTop + difTop - block.top
        // let difX = computedLeft + difLeft - block.left
        // ctx.emit("blocksMove", { difTop: difY, difLeft: difX })
        // console.log(block.left, block.top)

        block.top = computedTop + difTop
        block.left = computedLeft + difLeft
        // block.top = computedTop
        // block.left = computedLeft
        // console.log(computedTop, computedLeft, x2, y2)
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
        console.log("document.onmouseup")
        block.dragging = false
        document.onmousemove = document.onmouseup = null
      }
    }
    // 双击事件
    const dblclickFunction = (bolck: any) => {
      dialogEditBlock.value = bolck
      dialogEditType.value = bolck.key
      if (bolck.key === "img" || bolck.key === "video") {
        dialogVisible.value = true
      }
      getDatas()
    }
    // 获取 canvas body 缩放比例 -- 适应屏幕
    const getScale = () => {
      const canvasBody = document.getElementById("canvasBody")
      const canvas = document.getElementById("canvas")
      let scale = 1
      if (canvas && canvasBody) {
        scale = Number((canvasBody.clientHeight / canvas.clientHeight).toFixed(2)) - 0.03
      }
      canvasScale.value = Math.min(scale, 1)
    }
    // 获取 dialog 的 images
    const getDatas = () => {
      ctx.emit("getDatas", dialogEditType.value)
    }
    // 更换图片的 src
    const publishImage = (src: string) => {
      let block = dialogEditBlock.value
      if (dialogEditType.value === "img") {
        block.src = src
      } else if (dialogEditType.value === "video") {
        block.src = src
        console.log(block)
      }
    }
    // 根据 id 删除 userImages image
    const deleteData = (id: string) => {
      ctx.emit("deleteData", { id, type: dialogEditType.value })
    }
    // 按类型返回数据
    const computedDatas = computed(() => {
      if (dialogEditType.value === "img") {
        return props.userImages
      } else if (dialogEditType.value === "video") {
        return props.userVideos
      } else {
        return []
      }
    })
    const exportAsPicture = () => {
      const element = document.getElementById("canvas")
      if (element) {
        // html2canvas(element)
        //   .then((canvas) => {
        //     // document.body.appendChild(canvas)
        //     // 新增代码 返回图片的URL,设置为png格式
        //     let dataUrl = canvas.toDataURL("image/png")
        //     // let downloadUrl = dataUrl.replace("image/png", "image/octet-stream") //图片地址
        //     // console.log(downloadUrl)
        //     // window.location.href = downloadUrl // 跳转下载
        //     const link = document.createElement("a")
        //     link.style.display = "none"
        //     link.href = dataUrl
        //     link.setAttribute("download", "canvas.png")
        //     document.body.appendChild(link)
        //     link.click()
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
        domtoimage
          .toJpeg(element)
          .then((dataUrl: string) => {
            const link = document.createElement("a")
            link.style.display = "none"
            link.href = dataUrl
            link.setAttribute("download", "canvas.png")
            document.body.appendChild(link)
            link.click()
          })
          .catch((err: any) => {
            console.error("生成失败", err)
          })
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
        console.log(event)
      }
      document.onkeyup = (event) => {
        // 判断ctrl按键是否被按
        keyboardState.ctrlKey = event.ctrlKey
      }
      // 计算画布的缩放值
      getScale()
      window.addEventListener("resize", debounce(getScale, 300))
    })
    return {
      isDragging,
      blocks,
      canvasScale,
      mouseenterBox,
      dialogVisible,
      dialogEditType,
      computedDatas,
      changeIsDragging,
      changeDialogVisible,
      mousedownFunc,
      mouseupFunc,
      mouseenterFunc,
      mouseleaveFunc,
      blurFunc,
      dblclickFunction,
      getScale,
      getDatas,
      deleteData,
      publishImage,
      exportAsPicture,
    }
  },
})
</script>

<style lang="less" scoped>
.cont-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  // transform: scale(0.8);
  .canvas-body {
    width: 100%;
    height: 100%;
    // padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-canvas {
      width: 460.197px;
      height: 830.101px;
      background-color: rgb(234, 234, 234);
      position: relative;
      border: none;
      .mouseenter-box {
        border: 1px solid #6ccfff;
        margin: -1px 0 0 -1px;
        position: absolute;
        z-index: 2;
        pointer-events: none;
      }
      .guidelines {
        position: absolute;
        width: 100px;
        height: 1px;
        background-color: #ea56ff;
        top: 500px;
        left: 150px;
        z-index: 8;
      }
    }
  }
}
</style>
