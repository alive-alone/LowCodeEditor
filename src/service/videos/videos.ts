import commonRequest from "../index"

import { VideosType, SliceUpdateType } from "./type"
import { IResponseType } from "../type"

// import workerCode from "./worker" //?raw是为了标识以文件的方式import,而不是以内容

// 请求相应的 API
enum VideosAPI {
  getVideos = "/videos",
  deleteVideo = "/videos",
  uploadSliceVideo = "/videos",
  mergeSliceVideo = "/videos",
}

// 获取 videos
export function getVideos() {
  return commonRequest.get<IResponseType<VideosType>>({
    url: `${VideosAPI.getVideos}`,
  })
}

// 根据 id 删除 video
export function deleteVideo(id: string) {
  return commonRequest.delete<IResponseType>({
    url: `${VideosAPI.deleteVideo}/${id}`,
  })
}

// 分片上传视频
export function uploadSliceVideo(data: FormData) {
  return commonRequest.post<IResponseType<SliceUpdateType>>({
    url: VideosAPI.uploadSliceVideo,
    data: data,
  })
}

// 合并视频分片
export function mergeSliceVideo(values: { filename: string; suffix: string }) {
  return commonRequest.get<IResponseType>({
    url: `${VideosAPI.mergeSliceVideo}/${values.filename}/${values.suffix}`,
  })
}

// https://juejin.cn/post/7110121072032219166#heading-0
// https://juejin.cn/post/7055474765611401253#heading-0
// https://github.com/linhexs/file-upload/blob/345d09d5cb69c4067987cfecf88c5ee32cf81cb6/server.js#L128
