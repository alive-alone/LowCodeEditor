import CommonRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

const commonRequest = new CommonRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      return config
    },

    requestInterceptorsCatch: (err) => {
      return err
    },

    responseInterceptors: (res) => {
      return res
    },

    responseInterceptorsCatch: (err) => {
      return err
    },
  },
})

export default commonRequest
