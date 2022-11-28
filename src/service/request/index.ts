import axios from "axios"
import type { AxiosInstance } from "axios"

import { CommonRequestConfig, CommonRequestInterceptors } from "./type"

class CommonRequest {
  instance: AxiosInstance
  interceptors?: CommonRequestInterceptors
  constructor(config: CommonRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 注册私有拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 公共请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("请求成功拦截")
        return config
      },
      (err) => {
        // console.log("请求失败拦截")
        return err
      }
    )

    // 公共响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("响应成功拦截")
        return res.data ?? res
      },
      (err) => {
        // console.log("响应失败拦截")
        return err
      }
    )
  }

  request<T>(config: CommonRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断当前组件是否有私有请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res: T) => {
          // 判断当前组件是否有私有响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // 返回响应结果
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  patch<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }

  put<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" })
  }

  delete<T>(config: CommonRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }
}

export default CommonRequest
