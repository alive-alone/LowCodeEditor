import SparkMD5 from "spark-md5"

// 切片上传的分片为1M
const DefualtChunkSize = 1 * 1024 * 1024

export default addEventListener("message", (e) => {
  console.log(e)
  // const result = md5File(e.data)
  // postMessage(result)
})

// self.onmessage = (e) => {
//   console.log(e)
//   const result = md5File(e.data)
//   postMessage(result)
// }

const md5File = (file) => {
  return new Promise((resolve, reject) => {
    // 文件截取
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    // const blobSlice = File.prototype.slice
    const chunkSize = DefualtChunkSize
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    fileReader.onload = (e) => {
      console.log("read chunk nr", currentChunk + 1, "of", chunks)
      if (e.target && e.target.result && typeof e.target.result !== "string") {
        spark.append(e.target.result)
        currentChunk += 1
      }
      if (currentChunk < chunks) {
        loadNext()
      } else {
        const result = spark.end()
        resolve(result)
      }
    }
    fileReader.onerror = (err) => {
      console.error("文件读取错误", err)
      reject(err)
    }

    const loadNext = () => {
      const start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize

      // 文件切片
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      // 检查进度条
      // dispatch({ type: "check", checkPercent: currentChunk + 1 })
    }

    loadNext()
  })
}
