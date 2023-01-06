import { reactive } from "vue"

// let position = computed(() => store.getters["LowCodeModule/getModulePosition"])

export function mouseDown(event: MouseEvent, block: any, position: any, nearGuidelines: any) {
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
    nearGuidelines = []
    for (let i = 0; i < guidelines.length; i++) {
      nearGuidelines[i] = guidelines[i]
    }
  }
  startPos.top = block.top
  startPos.left = block.left
  document.onmouseup = function () {
    block.dragging = false
    document.onmousemove = document.onmouseup = null
  }
}

export function computedNearBlockcs(
  object: any,
  top: number,
  left: number,
  width: number,
  height: number,
  blockId: string
) {
  const standardDis = 5
  const difPos = reactive({
    top: standardDis,
    left: standardDis,
    nearTopBlock: [] as any[],
    nearLeftBlock: [] as any[],
    nearLeftTips: "",
    nearTopTips: "",
  })
  const nearBlocksPos = []
  const curPos = {
    left: left,
    halfwidthLeft: left + width / 2,
    widthLeft: left + width,
    top: top,
    halfHeightTop: top + height / 2,
    heightTop: top + height,
  }
  Object.keys(object).forEach((key) => {
    if (!(key === blockId)) {
      const arr = object[key]
      const { nearLeft, nearTop, nearTips } = nearPos(curPos, arr)
      if (nearLeft) {
        if (Math.abs(nearLeft) < Math.abs(difPos.left)) {
          difPos.left = nearLeft
          difPos.nearLeftBlock = [...arr]
          difPos.nearLeftTips = nearTips.left
        }
        // difPos.left = Math.abs(nearLeft) < Math.abs(difPos.left) ? nearLeft : difPos.left
      }
      if (nearTop) {
        if (Math.abs(nearTop) <= Math.abs(difPos.top)) {
          difPos.top = nearTop
          difPos.nearTopBlock = [...arr]
          difPos.nearTopTips = nearTips.top
        }
        // difPos.top = Math.abs(nearTop) < Math.abs(difPos.top) ? nearTop : difPos.top
      }
    }
  })
  if (difPos.left !== standardDis) {
    const res = nearGuidelines(
      curPos,
      difPos.nearLeftBlock,
      "left",
      difPos.left,
      difPos.nearLeftTips
    )
    nearBlocksPos.push([...res])
  }
  if (difPos.top !== standardDis) {
    const res = nearGuidelines(curPos, difPos.nearTopBlock, "top", difPos.top, difPos.nearTopTips)
    nearBlocksPos.push([...res])
  }
  return {
    difLeft: difPos.left === standardDis ? 0 : difPos.left,
    difTop: difPos.top === standardDis ? 0 : difPos.top,
    guidelines: [...nearBlocksPos],
  }
}
// const position = {
//   "1": [10, 50, 90, 10, 30, 50],
//   "2": [10, 50, 90, 10, 30, 50],
// }
function nearPos(curPos: any, arr: Array<number>) {
  const standardDis = 5
  let nearLeft = standardDis
  let nearTop = standardDis
  const nearTips = {
    left: "",
    top: "",
  }
  // left
  if (Math.abs(arr[0] - curPos.left) < standardDis) {
    if (Math.abs(arr[0] - curPos.left) < Math.abs(nearLeft)) {
      nearLeft = arr[0] - curPos.left
      nearTips.left = "00"
    }
    // nearLeft = Math.abs(arr[0] - curPos.left) < Math.abs(nearLeft) ? arr[0] - curPos.left : nearLeft
  }
  if (Math.abs(arr[1] - curPos.halfwidthLeft) < standardDis) {
    if (Math.abs(arr[1] - curPos.halfwidthLeft) < Math.abs(nearLeft)) {
      nearLeft = arr[1] - curPos.halfwidthLeft
      nearTips.left = "11"
    }
    // nearLeft =
    //   Math.abs(arr[1] - curPos.halfwidthLeft) < Math.abs(nearLeft)
    //     ? arr[1] - curPos.halfwidthLeft
    //     : nearLeft
  }
  if (Math.abs(arr[2] - curPos.widthLeft) < standardDis) {
    if (Math.abs(arr[2] - curPos.widthLeft) < Math.abs(nearLeft)) {
      nearLeft = arr[2] - curPos.widthLeft
      nearTips.left = "22"
    }
    // nearLeft =
    //   Math.abs(arr[2] - curPos.widthLeft) < Math.abs(nearLeft)
    //     ? arr[2] - curPos.widthLeft
    //     : nearLeft
  }
  if (Math.abs(arr[1] - curPos.left) < standardDis) {
    if (Math.abs(arr[1] - curPos.left) < Math.abs(nearLeft)) {
      nearLeft = arr[1] - curPos.left
      nearTips.left = "10"
    }
    // nearLeft = Math.abs(arr[1] - curPos.left) < Math.abs(nearLeft) ? arr[1] - curPos.left : nearLeft
  }
  if (Math.abs(arr[2] - curPos.left) < standardDis) {
    if (Math.abs(arr[2] - curPos.left) < Math.abs(nearLeft)) {
      nearLeft = arr[2] - curPos.left
      nearTips.left = "20"
    }
    // nearLeft = Math.abs(arr[2] - curPos.left) < Math.abs(nearLeft) ? arr[2] - curPos.left : nearLeft
  }

  if (Math.abs(arr[0] - curPos.halfwidthLeft) < standardDis) {
    if (Math.abs(arr[0] - curPos.halfwidthLeft) < Math.abs(nearLeft)) {
      nearLeft = arr[0] - curPos.halfwidthLeft
      nearTips.left = "01"
    }
    // nearLeft =
    //   Math.abs(arr[0] - curPos.halfwidthLeft) < Math.abs(nearLeft)
    //     ? arr[0] - curPos.halfwidthLeft
    //     : nearLeft
  }
  if (Math.abs(arr[0] - curPos.widthLeft) < standardDis) {
    if (Math.abs(arr[0] - curPos.widthLeft) < Math.abs(nearLeft)) {
      nearLeft = arr[0] - curPos.widthLeft
      nearTips.left = "02"
    }
    // nearLeft =
    //   Math.abs(arr[0] - curPos.widthLeft) < Math.abs(nearLeft)
    //     ? arr[0] - curPos.widthLeft
    //     : nearLeft
  }
  if (Math.abs(arr[1] - curPos.widthLeft) < standardDis) {
    if (Math.abs(arr[1] - curPos.widthLeft) < Math.abs(nearLeft)) {
      nearLeft = arr[1] - curPos.widthLeft
      nearTips.left = "12"
    }
  }
  // top
  if (Math.abs(arr[3] - curPos.top) < standardDis) {
    if (Math.abs(arr[3] - curPos.top) < Math.abs(nearTop)) {
      nearTop = arr[3] - curPos.top
      nearTips.top = "33"
    }
    // nearTop = Math.abs(arr[3] - curPos.top) < Math.abs(nearTop) ? arr[3] - curPos.top : nearTop
  }
  if (Math.abs(arr[4] - curPos.halfHeightTop) < standardDis) {
    if (Math.abs(arr[4] - curPos.halfHeightTop) < Math.abs(nearTop)) {
      nearTop = arr[4] - curPos.halfHeightTop
      nearTips.top = "44"
    }
    // nearTop =
    //   Math.abs(arr[4] - curPos.halfHeightTop) < Math.abs(nearTop)
    //     ? arr[4] - curPos.halfHeightTop
    //     : nearTop
  }
  if (Math.abs(arr[5] - curPos.heightTop) < standardDis) {
    if (Math.abs(arr[5] - curPos.heightTop) < Math.abs(nearTop)) {
      nearTop = arr[5] - curPos.heightTop
      nearTips.top = "55"
    }
    // nearTop =
    //   Math.abs(arr[5] - curPos.heightTop) < Math.abs(nearTop) ? arr[5] - curPos.heightTop : nearTop
  }
  if (Math.abs(arr[4] - curPos.top) < standardDis) {
    if (Math.abs(arr[4] - curPos.top) < Math.abs(nearTop)) {
      nearTop = arr[4] - curPos.top
      nearTips.top = "43"
    }
    // nearTop = Math.abs(arr[4] - curPos.top) < Math.abs(nearTop) ? arr[4] - curPos.top : nearTop
  }
  if (Math.abs(arr[5] - curPos.top) < standardDis) {
    if (Math.abs(arr[5] - curPos.top) < Math.abs(nearTop)) {
      nearTop = arr[5] - curPos.top
      nearTips.top = "53"
    }
    // nearTop = Math.abs(arr[5] - curPos.top) < Math.abs(nearTop) ? arr[5] - curPos.top : nearTop
  }
  if (Math.abs(arr[3] - curPos.halfHeightTop) < standardDis) {
    if (Math.abs(arr[3] - curPos.halfHeightTop) < Math.abs(nearTop)) {
      nearTop = arr[3] - curPos.halfHeightTop
      nearTips.top = "34"
    }
    // nearTop =
    //   Math.abs(arr[3] - curPos.halfHeightTop) < Math.abs(nearTop)
    //     ? arr[3] - curPos.halfHeightTop
    //     : nearTop
  }
  if (Math.abs(arr[3] - curPos.heightTop) < standardDis) {
    if (Math.abs(arr[3] - curPos.heightTop) < Math.abs(nearTop)) {
      nearTop = arr[3] - curPos.heightTop
      nearTips.top = "35"
    }
    // nearTop =
    //   Math.abs(arr[3] - curPos.heightTop) < Math.abs(nearTop) ? arr[3] - curPos.heightTop : nearTop
  }
  if (Math.abs(arr[4] - curPos.heightTop) < standardDis) {
    if (Math.abs(arr[4] - curPos.heightTop) < Math.abs(nearTop)) {
      nearTop = arr[4] - curPos.heightTop
      nearTips.top = "45"
    }
  }
  return {
    nearLeft: nearLeft === standardDis ? 0 : nearLeft,
    nearTop: nearTop === standardDis ? 0 : nearTop,
    nearTips: nearTips,
  }
}

function nearGuidelines(curPos: any, arr: Array<number>, type: string, dif: number, tip: string) {
  const linePos = new Array(4).fill(0)
  // console.log(tip)
  if (type === "left") {
    switch (tip) {
      case "00":
      case "10":
      case "20":
        linePos[0] = curPos.left + dif
        break
      case "12":
        linePos[0] = curPos.widthLeft + dif
        break
      case "11":
        linePos[0] = curPos.halfwidthLeft + dif
        break
      case "01":
      case "02":
        linePos[0] = curPos.widthLeft + dif
        break
      case "22":
        linePos[0] = arr[2]
        break
      default:
        linePos[0] = curPos.left + dif
    }
    linePos[1] = curPos.top < arr[3] ? curPos.top : arr[3]
    linePos[2] = 1
    if (curPos.top < arr[3]) {
      linePos[3] = Math.max(arr[5] - curPos.top, arr[5] - arr[3], curPos.heightTop - curPos.top)
    } else {
      linePos[3] = Math.max(
        curPos.heightTop - arr[3],
        arr[5] - arr[3],
        curPos.heightTop - curPos.top
      )
    }
  } else if (type === "top") {
    switch (tip) {
      case "33":
      case "43":
      case "53":
        linePos[1] = curPos.top + dif
        break
      case "44":
      case "45":
        linePos[1] = arr[4]
        break
      case "55":
        linePos[1] = arr[5]
        break
      case "34":
      case "35":
        linePos[1] = arr[3]
        break
      default:
        linePos[1] = curPos.top + dif
    }
    linePos[0] = curPos.left < arr[0] ? curPos.left : arr[0]
    // linePos[1] = curPos.top + dif
    if (curPos.left < arr[0]) {
      linePos[2] = Math.max(arr[2] - curPos.left, arr[2] - arr[0], curPos.widthLeft - curPos.left)
    } else {
      linePos[2] = Math.max(
        curPos.widthLeft - arr[0],
        arr[2] - arr[0],
        curPos.widthLeft - curPos.left
      )
    }
    // linePos[2] = curPos.left < arr[0] ? arr[2] - curPos.left : curPos.widthLeft - arr[0]
    linePos[3] = 1
  }
  return linePos
}

export function mouseEnter(block: any, box: any) {
  // const box = {
  //   display: "none",
  //   position: "",
  //   width: "0px",
  //   height: "0px",
  //   top: "0px",
  //   left: "0px",
  // }
  console.log(block, box)
  box.display = ""
  box.position = "absolute"
  box.left = `${block.left}px`
  box.top = `${block.top}px`
  box.width = `${block.width}px`
  box.height = `${block.height}px`
  // document.onmouseleave = () => {
  //   console.log("111111111111")
  //   box.display = "none"
  // }
  // return box
}
