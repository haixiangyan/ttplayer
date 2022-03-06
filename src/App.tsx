import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';
import {defaultPlayList, PlayListItem} from "./constants";
import Header from "./components/Header";

const App: FC = () => {
  const {visualize, stopVisualize, resetCanvas, clearCanvas} = useAudioVisualization('#canvas', 50);

  const [curtAudio, setCurtAudio] = useState<PlayListItem>(defaultPlayList[0]);
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
      setCurtAudio({ name: filename, url: blobUrl });
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
        <Header>正在播放：{curtAudio.name}</Header>
        <div className={styles.canvas}>
          <canvas id="canvas" width={500} height={300}/>
        </div>
        <div className={styles.controls}>
          <audio ref={audioRef} src={curtAudio.url} onPlay={onPlay} onPause={onPause} controls />
        </div>
      </div>

      <div className={styles.playList}>
        <Header>播放列表</Header>
        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            {playList.map((audio, index) => (
              <li key={audio.url} className={curtAudio.url === audio.url ? styles.active : undefined} onClick={() => setCurtAudio(audio)}>
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
    </div>
  )
}

export default App;
