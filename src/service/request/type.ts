import type { AxiosRequestConfig, AxiosResponse } from "axios"

// 拦截器类型限制
export interface CommonRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

// 添加拦截器属性
export interface CommonRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CommonRequestInterceptors<T>
}
