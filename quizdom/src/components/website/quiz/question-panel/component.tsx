// REACT
import React from "react";

// STYLES
import styles from "./css/qp.module.css";

// TOAST
import { toast } from "react-toastify";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";


export default function Component({
  alt,
  URI,
  vURI,
  type,
}: {
  alt: string | undefined;
  URI: string | undefined;
  type: string | undefined;
  vURI?: string | null;
}) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isplaying, setIsPlaying] = React.useState<boolean>(false);

  const handlePlay = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (audioRef.current) {
      if (!isplaying) {
        audioRef.current.play();
        toast.success("Turned the player on");
        setIsPlaying(!isplaying);
      } else {
        audioRef.current.pause();
        toast.success("Turned the player off");
        setIsPlaying(!isplaying);
      }
    }
  };

  return (
    <>

      {type === "img" && <img alt={alt} src={URI} className={styles.img} />}
      {type === "video" && <video controls src={URI} className={styles.img} />}
      {type === "audio" && (
        <div className={styles.container}>
          <img
            style={{ marginBottom: "3%" }}
            alt={alt}
            src={
              isplaying
                ? "/_asset/static/sound-wave.gif"
                : "/_asset/static/music.avif"
            }
            className={styles.img}
          />
          <div className={styles.button}>
            <FontAwesomeIcon
              fontSize={"50px"}
              style={{ cursor: "pointer", marginTop: "3%", marginBottom: "9%" }}
              icon={isplaying ? faPauseCircle : faPlayCircle}
              onClick={handlePlay}
            />
          </div>
          <audio ref={audioRef} controls hidden>
            <source src={URI} type="audio/mp3" />
          </audio>
        </div>
      )}
      {type === "visualaudio" && (
        <div>
          <div className={styles.container}>
            <img alt={alt} src={URI} className={styles.img} />
          </div>
          {vURI && (
            <>
              <div className={styles.container}>
                <img
                  style={{ marginBottom: "3%" }}
                  alt={alt}
                  src={
                    isplaying
                      ? "/_asset/static/sound-wave.gif"
                      : "/_asset/static/music.avif"
                  }
                  className={styles.img}
                />
              </div>
              <div className={styles.button}>
                <FontAwesomeIcon
                  fontSize={"50px"}
                  style={{
                    cursor: "pointer",
                    marginTop: "3%",
                    marginBottom: "9%",
                  }}
                  icon={isplaying ? faPauseCircle : faPlayCircle}
                  onClick={handlePlay}
                />
              </div>
              <audio ref={audioRef} controls hidden>
                <source src={vURI} type="audio/mp3" />
              </audio>
            </>
          )}
        </div>
      )}
      {type === "visualvideoans" && (
        <div>
          <div className={styles.container}>
            <img alt={alt} src={URI} className={styles.img} />
          </div>
          {vURI && (
            <div className={styles.container}>
              <video controls src={vURI} className={styles.img} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
