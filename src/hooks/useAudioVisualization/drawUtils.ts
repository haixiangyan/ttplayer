// 浮动的小块
let floats: any = [];
// 推的高度
const PUSH_HEIGHT = 10;
// 高度
const FLOAT_HEIGHT = 4;
// 下落高度
const DROP_DISTANCE = 1;

export const clearCanvas = (canvasEl: HTMLCanvasElement) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  // 绘制图形
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
}

export const drawFloats = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array, length?: number) => {
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

  const barWidth = canvasWidth / (length || dataArray.length);
  let x = 0;

  for (let i = 0; i < floats.length; i++) {
    const floatHeight = floats[i];

    canvasCtx.fillStyle = 'red';
    canvasCtx.fillRect(x, canvasHeight - floatHeight, barWidth, FLOAT_HEIGHT);

    x += barWidth + 1;
  }
}

export const drawCanvas = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array, length ?: number) => {
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  const barWidth = canvasWidth / (length || dataArray.length)
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];

    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)';
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}
