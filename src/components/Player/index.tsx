import React, {Ref} from "react";
import styles from "./styles.module.scss";
import {PlayListItem} from "../../constants";

interface Props {
  onPlay: () => void;
  onPause: () => void;
  playItem: PlayListItem;
}

const Player = React.forwardRef((props: Props, audioRef: Ref<HTMLAudioElement>) => {
  const { playItem, onPlay, onPause } = props;

  return (
    <div className={styles.player}>
      <div className={styles.canvas}>
        <canvas id="canvas" width={500} height={300}/>
      </div>
      <div className={styles.controls}>
        <audio ref={audioRef} src={playItem.url} onPlay={onPlay} onPause={onPause} controls />
      </div>
    </div>
  )
})

export default Player;
