import { Module } from "vuex"

import { LowCodeStore } from "./types"
import { IRootState } from "../types"

import { getDtId } from "@/assets/ts/lowCode/index"

const moduleDatas = require("@/views/datas.json")
// position: [left, left + width / 2, left + width, top, top + height / 2, top + height]

const LowCodeModule: Module<LowCodeStore, IRootState> = {
  namespaced: true,
  state() {
    return {
      leftTabs: [
        {
          id: 0,
          icon: "template",
          title: "模板",
        },
        {
          id: 1,
          icon: "font",
          title: "文字",
        },
        {
          id: 2,
          icon: "element",
          title: "元素",
        },
        {
          id: 3,
          icon: "photo",
          title: "照片",
        },
        {
          id: 4,
          icon: "component",
          title: "组件",
        },
        {
          id: 5,
          icon: "background",
          title: "背景",
        },
        {
          id: 6,
          icon: "music",
          title: "音乐",
        },
        {
          id: 7,
          icon: "mine",
          title: "我的",
        },
      ],
      moduleDatas: moduleDatas.blocks,
      moduleNearPosition: moduleDatas.position,
      nearGuidelines: [],
      editingBlocksId: [],
      activeIndex: 0,
    }
  },
  getters: {
    getActiveIndex(state) {
      return state.activeIndex
    },
    getLeftTabs(state) {
      return state.leftTabs
    },
    getModuleDatas(state) {
      return state.moduleDatas
    },
    getEditingBlocksId(state) {
      return state.editingBlocksId
    },
    getModuleNearPosition(state) {
      return state.moduleNearPosition
    },
    getNearGuidelines(state) {
      return state.nearGuidelines
    },
  },
  mutations: {
    changeActiveIndex(state, index: number) {
      state.activeIndex = index
    },
    changeModuleDatas(state, datas: Array<any>) {
      state.moduleDatas = datas
    },
    changeEditingBlocksId(state, ids: Array<string>) {
      state.editingBlocksId = ids
    },
    changeBlocksFocus(state, ids: Array<string>) {
      const arr = [...state.moduleDatas]
      arr.forEach((item) => {
        if (!ids.includes(item.id)) {
          item.focus = false
        }
      })
      state.moduleDatas = arr
    },
    changeBlocksStyle(state, styles: any) {
      const arr = [...state.moduleDatas]
      arr.forEach((item) => {
        if (state.editingBlocksId.includes(item.id)) {
          Object.keys(styles).forEach((key) => (item[key] = styles[key]))
        }
      })
    },
    changeBlocksPosition(state, values: { type: string; speed: number }) {
      const arr = [...state.moduleDatas]
      arr.forEach((item) => {
        if (state.editingBlocksId.includes(item.id)) {
          if (values.type === "left" || values.type === "right") {
            item.left -= values.speed
          } else if (values.type === "up" || values.type === "down") {
            item.top -= values.speed
          }
        }
      })
    },
    deleteBlocksById(state) {
      let arr = [...state.moduleDatas]
      arr = arr.filter((item) => {
        if (state.editingBlocksId.includes(item.id)) {
          // 删除 block nearPos 信息
          delete state.moduleNearPosition[item.id]
          return false
        } else {
          return item
        }
      })
      state.moduleDatas = arr
      state.editingBlocksId = []
    },
    changeModuleNearPosition(state, values: object) {
      state.moduleNearPosition = values
    },
    changeNearGuidelines(state, values: Array<any>) {
      state.nearGuidelines = values
    },
  },
  actions: {
    addText({ state, commit, dispatch }, type: string) {
      const id = getDtId()
      let modules
      if (type === "heading") {
        modules = {
          ...moduleDatas.modules.addText.heading,
        }
      } else if (type === "subheading") {
        modules = {
          ...moduleDatas.modules.addText.subheading,
        }
      } else {
        modules = {
          ...moduleDatas.modules.addText.text,
        }
      }
      modules.id = id
      const curPos = [
        modules.left,
        modules.left + modules.width / 2,
        modules.left + modules.width,
        modules.top,
        modules.top + modules.height / 2,
        modules.top + modules.height,
      ]
      dispatch("editBlocksNearPos", { type: "add", pos: curPos, id: id })
      commit("changeModuleDatas", [...state.moduleDatas, modules])
    },
    editBlocksId({ state, commit }, values: { type: string; id: string }) {
      let arr = [""]
      if (values.type === "add") {
        arr = [...state.editingBlocksId, values.id]
      } else if (values.type === "delete") {
        arr = state.editingBlocksId.filter((item) => {
          return item !== values.id
        })
      } else if (values.type === "empty") {
        arr = []
      } else if (values.type === "change") {
        arr = [values.id]
      }
      commit("changeEditingBlocksId", [...arr])
      commit("changeBlocksFocus", [...arr])
    },
    editBlocksNearPos(
      { state, commit },
      values: { type: string; pos: Array<number>; id?: string }
    ) {
      if (values.type === "add") {
        const positions = {
          ...state.moduleNearPosition,
        }
        if (values.id) {
          positions[values.id] = values.pos
        }
        commit("changeModuleNearPosition", positions)
      } else if (values.type === "delete") {
        console.log("")
      } else if (values.type === "update") {
        if (values.id) {
          const object = { ...state.moduleNearPosition }
          object[values.id] = values.pos
          commit("changeModuleNearPosition", object)
        }
      }
    },
  },
}

export default LowCodeModule
