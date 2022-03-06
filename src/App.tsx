import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import audioUrl from "./assets/dukou.flac";
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';
import {defaultPlayList, PlayListItem} from "./constants";

const App: FC = () => {
  const {visualize, stopVisualize, resetCanvas, clearCanvas} = useAudioVisualization('#canvas', 50);

  const [newAudio, setNewAudio] = useState<string>('');
  const [playList, setPlayList] = useState<PlayListItem[]>(defaultPlayList);

  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlay = async () => {
    if (audioRef.current) {
      stopVisualize();
      await audioRef.current.play();
      const stream = (audioRef.current as any).captureStream();
      visualize(stream)
    }
  }

  const onPause = async () => {
    resetCanvas();
  }

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const blobUrl = URL.createObjectURL(e.target.files[0]);
      setNewAudio(blobUrl);
    }
  };

  useEffect(() => {
    clearCanvas()
    resetCanvas();
    return () => {
      stopVisualize()
    }
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.canvas}>
          <canvas id="canvas" width={500} height={300}/>
        </div>
        <div className={styles.controls}>
          <audio ref={audioRef} src={newAudio || audioUrl} onPlay={onPlay} onPause={onPause} controls />
        </div>
      </div>

      <div className={styles.playList}>
        <ul className={styles.list}>
          {playList.map((audio, index) => (
            <li key={audio.url}>
              {index + 1}. {audio.name}
            </li>
          ))}
        </ul>
        <div className={styles.uploader}>
          <label>
            <span>添加</span>
            <input type="file" onChange={onUpload} accept="audio/*"/>
          </label>
        </div>
      </div>
    </div>
  )
}

export default App;
