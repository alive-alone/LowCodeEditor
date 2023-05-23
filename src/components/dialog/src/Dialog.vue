<template>
  <el-dialog v-model="centerDialogVisible" width="65%" top="11vh">
    <template #header> </template>
    <el-container>
      <el-aside width="160px">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="1">
            <span>个人中心</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>照片墙</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="dialog-main">
          <div class="update-box">
            <el-input
              v-model="searchValue"
              class="search_input"
              placeholder="搜索当前库"
              size="large"
            />
            <el-upload
              v-model:file-list="fileList"
              class="upload"
              :name="type"
              :action="uploadUrl"
              :accept="uploadAcceptType"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="uploadFiles"
            >
              <el-button type="primary" size="large">上传</el-button>
            </el-upload>
          </div>

          <el-scrollbar height="440px">
            <div class="image-list" v-if="datas && datas.length !== 0">
              <div class="list-item" v-for="(item, index) in datas" :key="item.id">
                <div
                  class="item"
                  @mouseenter="mouseInterId(item.id)"
                  @mouseleave="mouseInterId('')"
                >
                  <!-- <img :src="item.path" /> -->
                  <template v-if="type === 'img'">
                    <!-- {{ item.path }} -->
                    <el-image
                      class="img"
                      :src="item.path"
                      :zoom-rate="1.2"
                      :preview-src-list="datas.map((item) => item.path)"
                      :initial-index="index"
                      @close="mouseInterId('')"
                      fit="cover"
                    />
                  </template>
                  <template v-else-if="type === 'video'">
                    <!-- <video class="img" controls>
                      <source :src="item.path" />
                    </video> -->
                    <ShowVideo :src="item.path"></ShowVideo>
                  </template>
                  <div class="img-control">
                    <div
                      class="control delete"
                      v-show="activeInterId === item.id"
                      @click="deleteData(item.id)"
                    >
                      <SvgIcon className="icon-delete" iconName="delete"></SvgIcon>
                    </div>
                  </div>
                  <div class="img-publish">
                    <div
                      class="control publish"
                      v-show="activeInterId === item.id"
                      @click="publishImage(item.path)"
                    >
                      <SvgIcon className="icon-publish" iconName="publish"></SvgIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue"
import { defineComponent, Ref, computed, ref, reactive, onMounted } from "vue"

import ShowVideo from "./ShowVideo.vue"

import { SliceUploadVideo } from "@/service/videos/worker"

export default defineComponent({
  name: "Dialog",
  components: { SvgIcon, ShowVideo },
  emits: ["changeDialogVisible", "getDatas", "deleteData", "publishImage"],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    datas: {
      type: Array,
    },
    type: {
      type: String,
    },
  },
  setup(props, ctx) {
    let activeIndex = ref("1")
    let imagesList = [
      {
        id: 1,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/d6898380-e0ee-4956-9534-f4526997bbc16558.jpeg",
      },
      {
        id: 2,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 3,
        src: "https://gd-filems.dancf.com/saas/xi19e5/0/aa8f3a67-8c9f-4be7-ae0c-ea757db7152910370.jpg",
      },
      {
        id: 4,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 5,
        src: "https://gd-filems.dancf.com/saas/xi19e5/0/aa8f3a67-8c9f-4be7-ae0c-ea757db7152910370.jpg",
      },
      {
        id: 6,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 7,
        src: "https://gd-filems.dancf.com/saas/xi19e5/0/aa8f3a67-8c9f-4be7-ae0c-ea757db7152910370.jpg",
      },
      {
        id: 8,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 9,
        src: "https://gd-filems.dancf.com/saas/xi19e5/0/aa8f3a67-8c9f-4be7-ae0c-ea757db7152910370.jpg",
      },
      {
        id: 10,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 11,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/d6898380-e0ee-4956-9534-f4526997bbc16558.jpeg",
      },
      {
        id: 12,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 13,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 14,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/d6898380-e0ee-4956-9534-f4526997bbc16558.jpeg",
      },
      {
        id: 15,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
      {
        id: 16,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/d6898380-e0ee-4956-9534-f4526997bbc16558.jpeg",
      },
      {
        id: 17,
        src: "https://gd-filems.dancf.com/gaoding/gaoding/2269/c76c021a-dec7-4c59-9f94-68634feaaeb96627.jpeg",
      },
    ]
    let fileList = reactive([])
    let searchValue = ref("")
    let checkList = reactive([])
    let activeInterId = ref("")
    let centerDialogVisible: Ref<boolean> = computed({
      get() {
        return props.dialogVisible
      },
      set(value) {
        ctx.emit("changeDialogVisible", value)
      },
    })
    const uploadUrl = computed(() => {
      if (props.type === "img") {
        return "http://127.0.0.1:3000/images"
      } else if (props.type === "video") {
        return "http://127.0.0.1:3000/videos"
      } else {
        return ""
      }
    })
    const uploadAcceptType = computed(() => {
      if (props.type === "img") {
        return "image/*"
      } else if (props.type === "video") {
        return "video/mp4,audio/mp4"
      } else {
        return ""
      }
    })
    const uploadFiles = async (file: any) => {
      const result = await SliceUploadVideo(file.raw)
      if (result.code === 200) {
        ctx.emit("getDatas")
      }
    }
    // 上传成功后重新获取数据
    const uploadResult = (result: any) => {
      console.log(result)
      if (result && result.code === 200) {
        ctx.emit("getDatas")
      }
    }
    // el-menu 的选中项
    const handleSelect = (key: string) => {
      activeIndex.value = key
    }
    // 获取鼠标预览的图片 id
    const mouseInterId = (id: string) => {
      activeInterId.value = id
    }
    // 根据 id 删除 image or video
    const deleteData = (id: string) => {
      ctx.emit("deleteData", id)
    }
    // 修改图片
    const publishImage = (src: string) => {
      ctx.emit("publishImage", src)
      ctx.emit("changeDialogVisible", false)
    }
    onMounted(() => {
      // ctx.emit("getDatas")
    })
    return {
      activeIndex,
      imagesList,
      fileList,
      searchValue,
      centerDialogVisible,
      checkList,
      activeInterId,
      uploadUrl,
      uploadAcceptType,
      uploadResult,
      handleSelect,
      mouseInterId,
      deleteData,
      publishImage,
      uploadFiles,
    }
  },
})
</script>
<style>
.el-dialog {
  min-width: 550px;
  border-radius: 8px;
  height: 560px;
}
.el-dialog__body {
  padding: 0 20px 20px;
}
</style>

<style lang="less" scoped>
.el-menu-item {
  justify-content: center;
}
.dialog-main {
  .image-list {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .list-item {
      margin-right: 8px;
      margin-bottom: 4px;
      .item {
        position: relative;
        .img {
          height: 160px;
          border-radius: 3px;
        }
        .img-control {
          position: absolute;
          top: 5px;
          right: 5px;
          .delete {
            padding: 4px 2px;
            border-radius: 6px;
            .icon-delete {
              fill: #d8d8d8;
            }
          }
        }
        .img-publish {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .publish {
            padding: 6px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.4);
            .icon-publish {
              fill: #d8d8d8;
            }
          }
        }
        .control {
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
  .update-box {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-bottom: 8px;
    .el-button {
      width: 80px;
      font-weight: bold;
    }
    .search_input {
      width: 300px;
      margin-right: 20px;
    }
    .upload {
      display: flex;
      align-items: center;
    }
  }
}
</style>
