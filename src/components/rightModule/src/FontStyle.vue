<template>
  <div class="font-style">
    <div class="font-style-box style">
      <h2>样式</h2>
      <div class="color-box">
        <div>
          <p>颜色</p>
        </div>
        <div class="select-color">
          <input class="select-color-box" v-model="fontColor" type="color" />
          <input class="select-color-box" v-model="borderColor" type="color" />
        </div>
      </div>
    </div>
    <div class="font-style-box font">
      <h2>文字选项</h2>
      <div class="font-design">
        <el-select-v2
          v-model="fontFimaly"
          filterable
          :options="fontFimalyOptions"
          placeholder="Please select"
          size="large"
        />
        <div class="font-size">
          <el-select-v2
            class="font-size-select"
            v-model="fontSize"
            :options="fontSizeOptions"
            placeholder="Please select"
            size="large"
            filterable
            allow-create
          />
          <div class="size-opera">
            <span role="button" class="font-size__increase" @click="changeFontSize(1)"></span>
            <span role="button" class="font-size__decrease" @click="changeFontSize(-1)"></span>
          </div>
        </div>
        <div class="text-control_buttons">
          <div
            v-for="(item, index) in textControlOptions"
            :key="index"
            :class="{
              'text-control_item': true,
              item_border: index == 0 || index == 4 ? false : true,
            }"
            @click="textControl(index)"
          >
            <SvgIcon class="item" :icon-name="item[0]"></SvgIcon>
          </div>
        </div>
      </div>
    </div>
    <div class="font-style-box text-content">
      <h2>文本内容</h2>
      <div class="text-content-edit">
        <!-- <textarea class="textarea"></textarea> -->
        <el-input
          v-model="blockTextContence"
          class="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          type="textarea"
          placeholder="Please input"
        />
      </div>
    </div>
    <div class="font-style-box">
      <h2>高级设置</h2>
      <div class="font-style_opacity">
        <span class="panel-slider__label">不透明</span>
        <el-slider class="el-slider" v-model="opacityValue" />
      </div>
      <!-- <textarea class="textarea"></textarea> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType, Ref } from "vue"

export default defineComponent({
  name: "StyleCompiler",
  components: {},
  emits: ["changeBlockStyle"],
  props: {
    editBlocks: {
      type: Array as PropType<any>,
    },
  },
  setup(props, ctx) {
    // 字体颜色
    let fontColor: Ref<any> = computed({
      get() {
        if (props.editBlocks?.length !== 0) {
          return props.editBlocks[0].color
        } else {
          return "#000000"
        }
      },
      set(value) {
        ctx.emit("changeBlockStyle", { color: value })
      },
    })
    let borderColor = ref("#8652FF")
    // 字体内容
    let blockTextContence: Ref<any> = computed({
      get() {
        if (props.editBlocks?.length !== 0) {
          return props.editBlocks[0].text
        } else {
          return ""
        }
      },
      set(value) {
        ctx.emit("changeBlockStyle", { text: value })
      },
    })
    // 字体
    let fontFimaly: Ref<any> = computed({
      get() {
        if (props.editBlocks?.length !== 0) {
          return props.editBlocks[0].fontFamily === "" ? "默认字体" : props.editBlocks[0].fontFamily
        } else {
          return ""
        }
      },
      set(value) {
        ctx.emit("changeBlockStyle", { fontFamily: value })
      },
    })
    // 字号
    let fontSize: Ref<any> = computed({
      get() {
        if (props.editBlocks?.length !== 0) {
          return `${props.editBlocks[0].fontSize}px`
        } else {
          return ""
        }
      },
      set(value) {
        ctx.emit("changeBlockStyle", { fontSize: value })
      },
    })
    let opacityValue: Ref<any> = computed({
      get() {
        if (props.editBlocks?.length !== 0) {
          return props.editBlocks[0].opacity * 100
        } else {
          return 0
        }
      },
      set(value) {
        ctx.emit("changeBlockStyle", { opacity: Math.floor(value) / 100 })
      },
    })
    const textControlOptions = [
      ["bold"],
      ["italic"],
      ["underline"],
      ["strikethrough"],
      ["left-align", "middle-align", "right-align"],
      ["text-direction"],
      ["word-space"],
      ["row-space"],
    ]
    const fontFamilyArr = [
      ["默认字体", ""],
      ["签名字体", "EN-autograph"],
      ["钢笔字体", "Pen"],
      ["手写字体", "Handwritiong"],
      ["墨体", "Ink"],
      ["毛笔体", "Writing-brush"],
    ]
    const fontFimalyOptions = Array.from({ length: 6 }).map((_, index) => ({
      value: fontFamilyArr[index][1],
      label: fontFamilyArr[index][0],
    }))
    const fontSizeArr = [
      "12",
      "14",
      "16",
      "18",
      "20",
      "24",
      "26",
      "30",
      "36",
      "48",
      "60",
      "72",
      "84",
      "96",
      "108",
      "120",
    ]
    const fontSizeOptions = Array.from({ length: fontSizeArr.length }).map((_, index) => ({
      value: fontSizeArr[index],
      label: fontSizeArr[index],
    }))
    const changeFontSize = (value: number) => {
      // fontSize.value += value
      if (props.editBlocks?.length !== 0) {
        ctx.emit("changeBlockStyle", { fontSize: Number(props.editBlocks[0].fontSize) + value })
      }
    }
    const textControl = (index: number) => {
      if (index === 0) {
        if (props.editBlocks[0].fontWeight <= 400) {
          ctx.emit("changeBlockStyle", { fontWeight: 700 })
        } else {
          ctx.emit("changeBlockStyle", { fontWeight: 400 })
        }
      } else if (index === 1) {
        if (props.editBlocks[0].fontStyle == "") {
          ctx.emit("changeBlockStyle", { fontStyle: "oblique" })
        } else {
          ctx.emit("changeBlockStyle", { fontStyle: "" })
        }
      }
    }
    return {
      fontColor,
      borderColor,
      fontFimaly,
      fontSize,
      opacityValue,
      fontFimalyOptions,
      textControlOptions,
      blockTextContence,
      fontSizeOptions,
      changeFontSize,
      textControl,
    }
  },
})
</script>
<style lang="less" scoped>
.font-style {
  width: 100%;
  height: 100%;
  .font-style-box {
    // padding: 24px 0;
    h2 {
      font-size: 14px;
      color: #9da3ac;
      font-weight: 500;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #444950;
    }
  }
  .style {
    .color-box {
      padding: 10px;
      border: 1px solid #e0e5ea;
      border-radius: 4px;
      .select-color {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        margin: -1px -2px;
        .select-color-box {
          height: 32px;
          flex-grow: 1;
          padding: 2px;
          background-color: transparent;
          cursor: pointer;
        }
      }
    }
  }
  .font {
    padding: 0;
    padding-bottom: 24px;
    width: 100%;
    height: 100%;
    .el-select-v2 {
      width: 100%;
    }
    .font-design {
      .font-size {
        display: flex;
        flex-direction: row;
        position: relative;
        margin: 15px 0;
        .font-size-select {
          flex: 1;
          ::v-deep(.el-select-v2__suffix) {
            display: none;
          }
        }
        .size-opera {
          height: 100%;
          position: absolute;
          right: 0;
          .font-size__increase,
          .font-size__decrease {
            box-sizing: border-box;
            position: absolute;
            width: 30px;
            height: 50%;
            right: 0;
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
            border-left: 1px solid #e0e5ea;
            // color: #444950;
            color: #595959;
            cursor: pointer;
          }
          .font-size__increase {
            top: 0;
            border-bottom: 1px solid #e0e5ea;
          }
          .font-size__decrease {
            bottom: 0;
          }
          .font-size__increase::before,
          .font-size__decrease::before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-top: 2px solid;
            border-left: 8px solid;
          }
          .font-size__increase::after {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-top: 2px solid;
            border-left: 8px solid;
            position: absolute;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
          }
        }
      }
      .text-control_buttons {
        position: relative;
        border: 1px solid #e8eaec;
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        .text-control_item {
          position: relative;
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .text-control_item:hover {
          .item {
            fill: rgb(33, 33, 33);
          }
        }
        .item {
          fill: #636c78;
        }
      }
      .text-control_buttons::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1%;
        background-color: #e8eaec;
      }
      .item_border::after {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 12px;
        background-color: #e8eaec;
      }
    }
  }
  .text-content {
    padding: 0;
    .text-content-edit {
      padding: 2px;
      display: flex;
      ::v-deep(.el-textarea__inner) {
        resize: none;
      }
      .textarea {
        flex: 1;
        // border: 1px solid #e8eaec;
        font-size: 18px;
        resize: none;
        color: #444950;
        letter-spacing: 1px;
        max-height: 100px;
      }
      .textarea:focus {
        outline: none;
      }
    }
  }
  .font-style_opacity {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .panel-slider__label {
      -webkit-box-flex: 0;
      -ms-flex: none;
      flex: none;
      color: var(--text-default);
    }
    .el-slider {
      flex: 1;
      margin-left: 14px;
      margin-right: 14px;
    }
    .panel-slider__percent {
      width: 40px;
      height: 24px;
      border: 1px solid #e8eaec;
      outline: none;
      border-radius: 4px;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  input[type="color"] {
    -webkit-appearance: none;
    border: none;
    padding: 0;
    border-radius: 4px;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    margin: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: 1px solid #d3d8dd;
    border-radius: 4px;
  }
}
</style>
