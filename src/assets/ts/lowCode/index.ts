export function getDtId() {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  // const day = d.getDay()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const ms = d.getMilliseconds()
  // year = (year + "").substring(2);
  // if (month <= 9)
  //   month = "0" + month;
  // if (date <= 9)
  //   date = "0" + date;
  // if (hours <= 9)
  //   hours = "0" + hours;
  // if (minutes <= 9)
  //   minutes = "0" + minutes;
  // if (seconds <= 9)
  //   seconds = "0" + seconds;
  const num = Math.ceil(Math.random() * 1000)
  const id = `${year}${month}${date}${hours}${minutes}${seconds}${ms}${num}`
  return id
}
