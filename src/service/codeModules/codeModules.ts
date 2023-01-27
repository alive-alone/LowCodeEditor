import commonRequest from "../index"

import { codeModulesType, updateCodeModulesType } from "./type"
import { IResponseType } from "../type"

// 请求相应的 API
enum CodeModulesAPI {
  getCodeModules = "/modules",
  postCodeModules = "/modules",
  uploadImages = "/images",
}

// 获取 codeModules datas
export function getCodeModulesRequest(unique_key: string) {
  return commonRequest.get<IResponseType<codeModulesType>>({
    url: `${CodeModulesAPI.getCodeModules}/${unique_key}`,
  })
}

// 更新 codeModules datas
export function postCodeModulesRequest(values: updateCodeModulesType) {
  return commonRequest.post<IResponseType>({
    url: `${CodeModulesAPI.postCodeModules}`,
    data: values,
  })
}
