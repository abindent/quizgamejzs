// REACT
import React from "react";

// NEXT
import Image from "next/image";

// CSS
import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.loader}>
          <div>
            <Image alt="Icon" src="/icon.png" width={50} height={50} />
            <div className={styles.ring}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
