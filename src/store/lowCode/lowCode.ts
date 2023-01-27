import { Module } from "vuex"

import { LowCodeStore } from "./types"
import { IRootState } from "../types"

import { getDtId } from "@/assets/ts/lowCode/index"

import { getCodeModulesRequest, postCodeModulesRequest } from "@/service/codeModules/codeModules"
import { getImages, deleteImage } from "@/service/images/images"
import { getVideos, deleteVideo } from "@/service/videos/videos"

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
          icon: "video",
          title: "视频",
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
      unique_key: "alive",
      userImages: [],
      userVideos: [],
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
    getUserImages(state) {
      return state.userImages
    },
    getUserVideos(state) {
      return state.userVideos
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
    changeUserImages(state, values: Array<any>) {
      state.userImages = values
    },
    changeUserVideos(state, values: Array<any>) {
      state.userVideos = values
    },
  },
  actions: {
    // 获取 codeModules datas
    async getCodeModulesDatas({ state, commit }) {
      const result = await getCodeModulesRequest(state.unique_key)
      console.log(result)
      // const blocks = JSON.parse(result.data.blocks)
      // const position = JSON.parse(result.data.position)
      commit("changeModuleDatas", JSON.parse(result.data.blocks))
      commit("changeModuleNearPosition", JSON.parse(result.data.position))
    },
    // 更新 codeModules datas
    async postCodeModulesDatas({ state }) {
      console.log(state.moduleDatas)
      const result = await postCodeModulesRequest({
        blocks: JSON.stringify(state.moduleDatas),
        position: JSON.stringify(state.moduleNearPosition),
        unique_key: state.unique_key,
      })
      if (result.code !== 200) {
        console.log(result)
      }
    },
    // 获取 userImages or userVideos
    async getUserImgOrVideo({ commit }, type: string) {
      if (type === "img") {
        const result = await getImages()
        commit("changeUserImages", result.data)
      } else if (type === "video") {
        const result = await getVideos()
        commit("changeUserVideos", result.data)
      }
    },
    // 根据 id 删除 userImages image
    async deleteUserImgOrVideo({ dispatch }, values: { id: string; type: string }) {
      let result
      if (values.type === "img") {
        result = await deleteImage(values.id)
      } else if (values.type === "video") {
        result = await deleteVideo(values.id)
      }
      if (result && result.code === 200) {
        dispatch("getUserImgOrVideo", values.type)
      }
    },
    // 添加文本
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
    // 添加图片
    addImage({ state, commit }, values: { src: string; scale: number }) {
      const id = getDtId()
      const modules = {
        ...moduleDatas.modules.addImage,
      }
      modules.id = id
      modules.src = values.src
      if (values.scale > 1) {
        modules.height = modules.width / values.scale
      } else {
        modules.height = modules.width
        modules.width = values.scale * modules.height
      }
      commit("changeModuleDatas", [...state.moduleDatas, modules])
    },
    // 添加视频
    addVideo({ state, commit }, values: { src: string; scale: number }) {
      const id = getDtId()
      const modules = {
        ...moduleDatas.modules.addVideo,
      }
      modules.id = id
      modules.src = values.src
      if (values.scale > 1) {
        modules.height = modules.width / values.scale
      } else {
        modules.height = modules.width
        modules.width = values.scale * modules.height
      }
      commit("changeModuleDatas", [...state.moduleDatas, modules])
    },
    // 多模块移动
    blocksMove({ state, commit }, values: { difTop: number; difLeft: number }) {
      const arr = [...state.moduleDatas]
      arr.forEach((block) => {
        if (state.editingBlocksId.includes(block.id)) {
          block.dragging = true
          block.top += values.difTop
          block.left += values.difLeft
        }
      })
      commit("changeModuleDatas", [...arr])
    },
    // 编辑模块 id 操作
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
    // 当前模块的靠近线
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
