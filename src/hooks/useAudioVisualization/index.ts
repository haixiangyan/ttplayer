import {useRef} from "react";
import {clearCanvas, drawBars, drawFloats} from "./drawUtils";

const useAudioVisualization = (selector: string, length = 50) => {
  const audioCtxRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();

  // 每个动画帧都画图
  const drawEachFrame = (canvasEl: HTMLCanvasElement, dataArray: Uint8Array) => {
    // 递归调用
    requestAnimationFrame(() => drawEachFrame(canvasEl, dataArray));

    if (analyserRef.current) {
      // 读取数据
      analyserRef.current.getByteFrequencyData(dataArray);
      // 更新长度
      const bars = dataArray.slice(0, Math.min(length, dataArray.length));
      // 画图
      clearCanvas(canvasEl);
      drawBars(canvasEl, bars);
      drawFloats(canvasEl, bars);
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

  return { visualize, clearCanvas }
}

export default useAudioVisualization;
