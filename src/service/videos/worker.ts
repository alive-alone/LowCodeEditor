import SparkMD5 from "spark-md5"
import { uploadSliceVideo, mergeSliceVideo } from "./videos"
// 切片上传的分片为1M
const DefaultChunkSize = 1 * 1024 * 1024
// 并发请求最大数量
const DefaultMaxNumUpload = 3

interface SliceUploadVideoType {
  code: number
  message: string
}

export const SliceUploadVideo: (file: File) => Promise<SliceUploadVideoType> = (file: File) => {
  const suffix = file.name.split(".")[1]
  const result = md5File(file)
  const returnValue = result.then((data: any) => {
    return uploadFileChunks(data.fileChunks, DefaultMaxNumUpload, data.fileMD5, suffix)
  })
  return returnValue
}
export const md5File = (file: File) => {
  return new Promise((resolve, reject) => {
    // 文件截取
    // const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const blobSlice = File.prototype.slice
    const chunkSize = DefaultChunkSize
    const chunks = Math.ceil(file.size / chunkSize)
    const fileChunks: object[] = []
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    fileReader.onload = (e) => {
      // console.log("read chunk nr", currentChunk + 1, "of", chunks)
      if (e.target && e.target.result && typeof e.target.result !== "string") {
        spark.append(e.target.result)
        currentChunk += 1
      }
      if (currentChunk < chunks) {
        loadNext()
      } else {
        const fileMD5 = spark.end()
        resolve({ fileChunks: fileChunks, fileMD5: fileMD5 })
      }
    }
    fileReader.onerror = (err) => {
      console.error("文件读取错误", err)
      reject(err)
    }
    const loadNext = () => {
      const start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize
      const chunk = blobSlice.call(file, start, end)
      fileChunks.push({
        hash: currentChunk,
        chunk: chunk,
      })
      fileReader.readAsArrayBuffer(chunk)
    }
    loadNext()
  })
}

const uploadFileChunks = async function (
  list: any[],
  maxNum: number,
  filename: string,
  suffix: string
) {
  return new Promise<SliceUploadVideoType>((resolve) => {
    if (list.length === 0) {
      console.log("Upload to complete")
      return
    }
    let index = 0 // 请求进度
    let finish = 0 // 完成数量
    const failList: object[] = [] // 失败列表

    async function request() {
      if (index === list.length) {
        if (failList.length) {
          uploadFileChunks(failList, maxNum, filename, suffix)
        } else {
          return
        }
      }
      const i = index
      const item = list[i]
      const formData = new FormData()
      formData.append("filename", filename)
      formData.append("hash", item.hash)
      formData.append("chunk", item.chunk)
      index++
      try {
        const result = await uploadSliceVideo(formData)
        console.log(result)
      } catch (err) {
        console.error(err)
        failList.push(item)
      } finally {
        finish++
        if (finish === list.length) {
          const result = mergeSliceVideo({ filename: filename, suffix: suffix })
          result.then(async (data) => {
            resolve(data)
          })
        }
        request()
      }
    }
    const times = Math.min(maxNum, list.length)
    for (let i = 0; i < times; i++) {
      request()
    }
  })
}
