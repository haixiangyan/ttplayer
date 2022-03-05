export const drawCanvas = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
  // 可视化
  const canvasWidth = canvasEl.width;
  const canvasHeight = canvasEl.height;
  const canvasCtx = canvasEl.getContext("2d");

  if (!canvasCtx) {
    return;
  }

  // 绘制图形
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

  const barWidth = (canvasWidth / dataArray.length) * 2.5
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];

    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)';
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}
