// REACT
import React from "react";

// NEXT JS FONT
import { Nunito } from "next/font/google";

// NEXT JS
import Link from "next/link";

// CSS
import styles from "../../css/q.module.css";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

// FONT
const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
});

export default function Panel({ category }: { category: string }) {
  function genURL(q_no: string) {
    return `/quiz/${category}/round/on-your-own/${q_no}?type=img`;
  }
  return (
    <div className={nunito.className}>
      <section className={styles.oyo_qns}>
        <h1 className={styles.oyo}>
          <FontAwesomeIcon icon={faCube} /> On Your Own
        </h1>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - I </h3>
          <Link href={genURL("1")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - II </h3>
          <Link href={genURL("2")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - III </h3>
          <Link href={genURL("3")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - IV </h3>
          <Link href={genURL("4")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - V </h3>
          <Link href={genURL("5")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - VI </h3>
          <Link href={genURL("6")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - VII </h3>
          <Link href={genURL("7")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - VIII </h3>
          <Link href={genURL("8")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
