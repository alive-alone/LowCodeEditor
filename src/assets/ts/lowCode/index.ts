export function getDtId() {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const ms = d.getMilliseconds()
  const num = Math.ceil(Math.random() * 1000)
  const id = `${year}${month}${date}${hours}${minutes}${seconds}${ms}${num}`
  return id
}

export const debounce = (func: (...arg: any[]) => any, delay: number, immediate = false): any => {
  let timer: number | undefined
  return (...args: any) => {
    if (immediate) {
      func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
