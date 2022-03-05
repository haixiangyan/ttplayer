import {useRef} from "react";
import {clearCanvas, drawCanvas, drawFloats} from "./drawUtils";

const useAudioVisualization = (selector: string, length = 40) => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();

  // 每个动画帧都画图
  const drawEachFrame = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
    // 递归调用
    requestAnimationFrame(() => drawEachFrame(canvasEl, dataArray));

    if (analyserRef.current) {
      // 读取数据
      analyserRef.current.getByteFrequencyData(dataArray);
      // 画图
      clearCanvas(canvasEl);
      drawCanvas(canvasEl, dataArray, length);
      drawFloats(canvasEl, dataArray, length);
    }
  }

  // 开始可视化
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
    // 将音频源连接解析器
    source.connect(analyserRef.current);

    // 准备数据数组
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 开始递归画图
    drawEachFrame(canvasEl, dataArray);
  }

  return { visualize }
}

export default useAudioVisualization;
