import React, {FC, useEffect, useRef} from 'react';
import audioUrl from "./assets/test.flac";
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';

const App: FC = () => {
  const {visualize, stopVisualize, clearCanvas} = useAudioVisualization('#canvas', 50);

  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      const stream = (audioRef.current as any).captureStream();
      visualize(stream)
    }
  }

  const onPause = async () => {
    stopVisualize();
  }

  useEffect(() => {
    clearCanvas(document.querySelector('#canvas') as HTMLCanvasElement)
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <canvas id="canvas" width={400} height={160}/>
        </div>
        <div className={styles.audio}>
          <audio ref={audioRef} src={audioUrl} onPlay={onPlay} onPause={onPause} controls />
        </div>
      </div>
    </div>
  )
}

export default App;
