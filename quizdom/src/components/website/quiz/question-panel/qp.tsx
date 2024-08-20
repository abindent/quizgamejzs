"use client";
// REACT
import * as React from "react";

// CSS
import styles from "./css/qp.module.css";

// TOAST
import { toast } from "react-toastify";
import Component from "./component";

export default function PointBlank({
  category,
  qno,
  round,
  type,
}: {
  category: string;
  qno: string;
  round: string;
  type: string;
}) {
  function getExtension(type: string) {
    if (type === "img") {
      return "png";
    } else if (type === "video") {
      return "mp4";
    } else {
      return "mp3";
    }
  }

  interface ANS {
    type: string | undefined;
    extension: string | undefined;
  }
  const [ans, setAns] = React.useState<ANS>({
    type: type,
    extension: getExtension(type),
  });
  const [showAns, setShowAns] = React.useState<boolean>(false);

  // QUESTION AND ANSWER STRING
  const QURI = `/_asset/quiz/${category}/${
    ans.type as string
  }/${round}-${qno}.${ans.extension as string}`;
  const AURI = `/_asset/quiz/${category}/img/${round}-ans-${qno}.png`;

  function ShowAns(e: React.SyntheticEvent) {
    e.preventDefault();
    window.alert(`Do you want to show the ${showAns ? "question" : "answer"}?`);
    setShowAns(!showAns);
    toast.success(
      `Successfully updated the image with ${showAns ? "question" : "answer"}`
    );
  }
  return (
    <div>
      <div className={styles.container}>
        {!showAns && <Component alt="img" URI={QURI} type={type} />}
        {showAns && <Component alt="img" URI={AURI} type={type} />}
        <div className={styles.button}>
          <button className={styles.btn}>Show Previous</button>
          <button className={styles.btn} onClick={ShowAns}>
            Show {showAns ? "Question" : "Answer"}
          </button>
          <button className={styles.btn}>Show Next</button>
        </div>
      </div>
    </div>
  );
}
