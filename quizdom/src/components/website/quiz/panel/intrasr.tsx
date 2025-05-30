// REACT
import React from "react";

// NEXT JS FONT
import { Nunito } from "next/font/google";

// NEXT JS
import Link from "next/link";

// CSS
import styles from "./css/round.module.css";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

// FONT
const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
});

export default function Panel() {
  return (
    <div className={nunito.className}>
      <div className={styles.mainq}>
        <h1 className={styles.head1}>
          <FontAwesomeIcon icon={faCube} /> Rounds:{" "}
        </h1>
        <section className={styles.injr}>
          <div className={styles.rounds}>
            <Link href="/quiz/intraschool/senior/round/on-your-own">
              <div className={styles.first}>
                <img src="/_asset/static/person.jpg" loading="lazy" alt="person" />
              </div>
              <div className={styles.second}>
                <h1>On Your Own</h1>
              </div>
            </Link>
          </div>

          <div className={styles.rounds}>
            <Link href="/quiz/intraschool/senior/round/pounce-bounce">
              <div className={styles.first}>
                <img src="/_asset/static/bounce.jpg" loading="lazy" alt="logo" />
              </div>
              <div className={styles.second}>
                <h1>Pounce - Bounce</h1>
              </div>
            </Link>
          </div>

          <div className={styles.rounds}>
            <Link href="/quiz/intraschool/senior/round/connections">
              <div className={styles.first}>
                <img src="/_asset/static/connection.jpg" loading="lazy" alt="" />
              </div>
              <div className={styles.second}>
                <h1>Connections</h1>
              </div>
            </Link>
          </div>

          <div className={styles.rounds}>
            <Link href="/quiz/intraschool/senior/round/on-your-fingertips">
              <div className={styles.first}>
                <img src="/_asset/static/fingertips.png" loading="lazy" alt="logo" />
              </div>
              <div className={styles.second}>
                <h1>On Your Fingertips</h1>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
