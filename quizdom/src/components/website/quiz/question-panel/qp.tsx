"use client";
// REACT
import * as React from "react";

// NEXTJS
import { useRouter } from "next/navigation";

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
  limit,
  path,
}: {
  category: string;
  qno: string;
  round: string;
  type: string;
  path: string;
  limit?: string;
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
  const [prevdisabled, setPrevDisabled] = React.useState<boolean>(false);
  const [nextdisabled, setNextDisabled] = React.useState<boolean>(false);

  // QUESTION AND ANSWER STRING
  const QURI = `/_asset/quiz/${category}/${ans.type}/${round}-${qno}.${ans.extension}`;
  const AURI = `/_asset/quiz/${category}/${ans.type}/${round}-ans-${qno}.${ans.extension}`;
  // ROUTER
  const router = useRouter();

  // SHOW NEXT
  function getNextURL(qno: string, type: string | undefined) {
    if (qno !== limit) {
      return path.replace(`${qno}`, `${Number(qno)+ 1}?type=${type}`);
    }
    else{
      setNextDisabled(!nextdisabled);
      return ``;
    }
  }

  // GET PREV
  function getPrevURL(qno: string, type: string | undefined) {
    if (Number(qno) !== 1) {
      return path.replace(`${qno}`, `${Number(qno) - 1}?type=${type}`);
    }
    else{
      setPrevDisabled(!prevdisabled);
      return ``;
    }
  }

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
          <button disabled={prevdisabled} className={styles.btn} onClick={()=>{router.push(getPrevURL(qno, ans.type))}}>Show Previous</button>
          <button className={styles.btn} onClick={ShowAns}>
            Show {showAns ? "Question" : "Answer"}
          </button>
          <button disabled={nextdisabled} className={styles.btn} onClick={()=>{router.push(getNextURL(qno, ans.type))}} >Show Next</button>
        </div>
      </div>
    </div>
  );
}
