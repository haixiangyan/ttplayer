// 浮动的小块
let floats: any = [];
// 推的高度
const PUSH_HEIGHT = 10;
// 高度
const FLOAT_HEIGHT = 4;
// 下落高度
const DROP_DISTANCE = 1;
// Bar 的 border 宽度
const BORDER_WIDTH = 1;
// 高度比例
const HEIGHT_RATIO = 1;

export const clearCanvas = (canvasEl: HTMLCanvasElement) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  // 绘制图形
  canvasCtx.fillStyle = 'rgb(29,19,62)';
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
}

export const drawFloats = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  // 找到最大值，以及初始化高度
  dataArray.forEach((item, index) => {
    // 默认值
    floats[index] = floats[index] || FLOAT_HEIGHT;
    // 处理当前值
    floats[index] = item > floats[index] ? item + FLOAT_HEIGHT + PUSH_HEIGHT : floats[index] - DROP_DISTANCE;
    // 保底
    floats[index] = Math.max(floats[index], FLOAT_HEIGHT);
  })

  const barWidth = canvasWidth / dataArray.length;
  let x = 0;

  for (let i = 0; i < floats.length; i++) {
    const floatHeight = floats[i] * HEIGHT_RATIO;

    canvasCtx.fillStyle = '#3e47a0';
    canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, FLOAT_HEIGHT);

    x += barWidth + BORDER_WIDTH;
  }
}

export const drawBars = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  const barWidth = canvasWidth / dataArray.length
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] * HEIGHT_RATIO;

    // 添加渐变色
    const gradient = canvasCtx.createLinearGradient(canvasWidth / 2, canvasHeight / 3, canvasWidth / 2, canvasHeight);
    gradient.addColorStop(0, '#5cb7ff');
    gradient.addColorStop(0.5, '#4c60cb');
    gradient.addColorStop(1, '#5cb7ff');

    // 画 bar
    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    x += barWidth + BORDER_WIDTH;
  }
}
