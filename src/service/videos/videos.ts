import commonRequest from "../index"

import { VideosType } from "./type"
import { IResponseType } from "../type"

// 请求相应的 API
enum VideosAPI {
  getVideos = "/videos",
  deleteVideo = "/videos",
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
