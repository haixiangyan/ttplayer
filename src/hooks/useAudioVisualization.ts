import {useRef} from "react";

const drawCanvas = (canvasCtx: CanvasRenderingContext2D, dataArray: Uint8Array, canvasWidth: number, canvasHeight: number, bufferLength: number) => {
  const barWidth = (canvasWidth / bufferLength) * 2.5
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];

    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',255,255)';
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

const useAudioVisualization = (selector: string) => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();

  const draw = (canvasCtx: CanvasRenderingContext2D, dataArray: Uint8Array, canvasWidth: number, canvasHeight: number, bufferLength: number) => {
    // 递归调用
    requestAnimationFrame(() => draw(canvasCtx, dataArray, canvasWidth, canvasHeight, bufferLength));

    if (!analyserRef.current) {
      return;
    }

    analyserRef.current.getByteFrequencyData(dataArray);

    // 绘制图形
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawCanvas(canvasCtx, dataArray, canvasWidth, canvasHeight, bufferLength);
  }

  const visualize = (stream: MediaStream) => {
    const canvasEl: HTMLCanvasElement | null = document.querySelector(selector);
    if (!canvasEl) {
      throw new Error('找不到 canvas');
    }

    // 创建解析器
    audioCtxRef.current = new AudioContext()
    analyserRef.current = audioCtxRef.current.createAnalyser();

    // 获取音频源
    const source = audioCtxRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    // 可视化
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 可视化
    const WIDTH = canvasEl.width;
    const HEIGHT = canvasEl.height;
    const canvasCtx = canvasEl.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    // 清空
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    draw(canvasCtx, dataArray, WIDTH, HEIGHT, bufferLength);
  }

  return { visualize }
}

export default useAudioVisualization;
