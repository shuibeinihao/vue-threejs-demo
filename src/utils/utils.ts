// 截取时间时分秒
// 2023-10-03 10:03:23 ----> 2023-10-03
export const formatTime = (time: string) => {
  return time.split(" ")[0];
};

//获取当前时间 _isHourMinuteSecond 是否需要时分秒
export const currentDate = (_isHourMinuteSecond: boolean = true) => {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  if (_isHourMinuteSecond) {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

// 图片添加域名
export const formatPic = (url: string) => {
  const picURL = import.meta.env.VITE_PIC_URL;
  return picURL + url;
};
