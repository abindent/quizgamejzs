// REACT
import React from "react";

// NEXT JS FONT
import { Nunito } from "next/font/google";

// NEXT JS
import Link from "next/link";

// CSS
import styles from "../css/oyf.module.css";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

// FONT
const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
});

export default function Panel({ category }: { category: string }) {
  function genURL(q_no: string, type?:string) {
    return `/quiz/${category}/round/on-your-fingertips/${q_no}?type=${type}`;
  }
  return (
    <div className={nunito.className}>
    <section className={styles.back}>
        <section className={styles.head}>
            <div className={styles.left}><h1><FontAwesomeIcon icon={faCube} />   On Your Fingertips</h1></div>
            <div className={styles.next_btn}><Link href="/quiz" ><button>Go to Main Page</button></Link></div>
        </section>
    <div className={styles.main}>
        <button className={`${styles.option} ${styles.option_a}`}><Link href={genURL("music", "visualaudio")}> Music </Link></button>
        <button className={`${styles.option} ${styles.option_b}`}><Link href={genURL("sports", "img")}> Sports </Link></button>
        <button className={`${styles.option} ${styles.option_c}`}><Link href={genURL("history", "img")}> History </Link></button>
        <button className={`${styles.option} ${styles.option_d}`}><Link href={genURL("world", "img")}> World </Link></button>
        <button className={`${styles.option} ${styles.option_e}`}><Link href={genURL("literature", "img")}> Literature </Link></button>
        <button className={`${styles.option} ${styles.option_f}`}><Link href={genURL("mythology", "img")}> Mythology </Link></button>
        <button className={`${styles.option} ${styles.option_g}`}><Link href={genURL("defence", "img")}> Defence </Link></button>
        <button className={`${styles.option} ${styles.option_h}`}><Link href={genURL("astronomy", "img")}> Astronomy </Link></button>
    </div>
</section>
    </div>
  );
}
