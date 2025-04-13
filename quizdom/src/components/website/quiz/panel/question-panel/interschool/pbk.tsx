"use client";
// REACT
import React from "react";

// NEXT JS FONT
import { Nunito } from "next/font/google";

// NEXT JS
import Link from "next/link";

// CSS
import styles from "../css/q.module.css";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

// AUTH CONTEXT
import { useAuthContext } from "@/context/auth/state";
import { Team, ContextType } from "@/context/auth/context";

// FONT
const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
});

export default function Panel({ category }: { category: string }) {
  const { team }: ContextType = useAuthContext();
  function genURL(q_no: string, type?: string) {
    return `/quiz/${category}/round/point-blank/${q_no}?type=${type}`;
  }

  return (
    <div className={nunito.className}>
      <section className={styles.oyo_qns}>
        <h1 className={styles.oyo}>
          <FontAwesomeIcon icon={faCube} /> Point Blank
        </h1>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - I </h3>
          <Link href={genURL("1", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - II </h3>
          <Link href={genURL("2", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - III </h3>
          <Link href={genURL("3", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - IV </h3>
          <Link href={genURL("4", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - V </h3>
          <Link href={genURL("5", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - VI </h3>
          <Link href={genURL("6", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - VII </h3>
          <Link href={genURL("7", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - VIII </h3>
          <Link href={genURL("8", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - IX </h3>
          <Link href={genURL("9", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - X </h3>
          <Link href={genURL("10", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - XI </h3>
          <Link href={genURL("11", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - XII </h3>
          <Link href={genURL("12", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - XIII </h3>
          <Link href={genURL("13", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - XIV </h3>
          <Link href={genURL("14", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - XV </h3>
          <Link href={genURL("15", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
        <div className={styles.qns}>
          <h3 className={styles.ti}>Question - XVI </h3>
          <Link href={genURL("16", "img")}>
            <button className={styles.qns_ans}>View</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
