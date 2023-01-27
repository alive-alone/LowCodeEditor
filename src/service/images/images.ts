import commonRequest from "../index"

import { ImagesType } from "./type"
import { IResponseType } from "../type"

// 请求相应的 API
enum ImagesAPI {
  getImages = "/images",
  deleteImage = "/images",
}

// 获取 codeModules datas
export function getImages() {
  return commonRequest.get<IResponseType<ImagesType>>({
    url: `${ImagesAPI.getImages}`,
  })
}

// 根据 id 删除 image
export function deleteImage(id: string) {
  return commonRequest.delete<IResponseType>({
    url: `${ImagesAPI.deleteImage}/${id}`,
  })
}
