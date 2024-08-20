import React from "react";
import styles from "./css/qp.module.css";

export default function Component({
  alt,
  URI,
  type,
}: {
  alt: string | undefined;
  URI: string | undefined;
  type: string | undefined;
}) {
  return (
    <div>
      {type === "img" && <img alt={alt} src={URI} className={styles.img} />}
      {type === "video" && <video src={URI} className={styles.img} />}
      {type === "audio" && (
        <>
          <audio id="audio_" controls hidden autoPlay>
            <source src={URI} type="audio/mp3" />
          </audio>
        </>
      )}
    </div>
  );
}
