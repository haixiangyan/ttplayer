import React, {ChangeEventHandler, FC, useEffect, useRef, useState} from 'react';
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';
import {defaultPlayList, PlayListItem} from "./constants";
import Header from "./components/Header";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import {padLeft} from "./utils";

const App: FC = () => {
  const {visualize, stopVisualize, resetCanvas} = useAudioVisualization('#canvas', 50);

  const [curtTime, setCurtTime] = useState<string>('00:00');
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
    resetCanvas();
    return () => {
      stopVisualize()
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const minute = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        setCurtTime(`${padLeft(minute)}:${padLeft(seconds)}`);
      }
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.playerWrapper}>
        <Header>
          正在播放：{curtAudio.name}
          <span style={{ marginLeft: "auto" }}>{curtTime}</span>
        </Header>
        <Player ref={audioRef} onPlay={onPlay} onPause={onPause} playItem={curtAudio} />
      </div>

      <div className={styles.playListWrapper}>
        <Header>播放列表</Header>
        <PlayList playList={playList} playItem={curtAudio} onUpload={onUpload} setPlayItem={setCurtAudio} />
      </div>
    </div>
  )
}

export default App;
