import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';
import {defaultPlayList, PlayListItem} from "./constants";

const App: FC = () => {
  const {visualize, stopVisualize, resetCanvas, clearCanvas} = useAudioVisualization('#canvas', 50);

  const [audioUrl, setAudioUrl] = useState<string>(defaultPlayList[0].url);
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
      const [file] = e.target.files;
      const blobUrl = URL.createObjectURL(file);
      const [filename] = file.name.split('.');
      setAudioUrl(blobUrl);
      setPlayList([...playList, { name: filename, url: blobUrl }])
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
          <audio ref={audioRef} src={audioUrl} onPlay={onPlay} onPause={onPause} controls />
        </div>
      </div>

      <div className={styles.playList}>
        <ul className={styles.list}>
          {playList.map((audio, index) => (
            <li key={audio.url} className={audioUrl === audio.url ? styles.active : undefined} onClick={() => setAudioUrl(audio.url)}>
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
