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

// CONTEXT
import { ContextType } from "@/context/context";
import { useAuthContext } from "@/context/auth/state";

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
  // INTERFACE
  interface ANS {
    type: string | undefined;
    extension: string | undefined;
  }
  // USESTATE VARS
  const [ans, setAns] = React.useState<ANS>({
    type: type,
    extension: getExtension(type),
  });
  const [showAns, setShowAns] = React.useState<boolean>(false);
  const [load, setLoad] = React.useState<boolean>(false);
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
      return path.replace(`${qno}`, `${Number(qno) + 1}?type=${type}`);
    } else {
      setNextDisabled(!nextdisabled);
      return ``;
    }
  }

  // GET PREV
  function getPrevURL(qno: string, type: string | undefined) {
    if (Number(qno) !== 1) {
      return path.replace(`${qno}`, `${Number(qno) - 1}?type=${type}`);
    } else {
      setPrevDisabled(!prevdisabled);
      return ``;
    }
  }

  // SHOW ANS
  function ShowAns(e: React.SyntheticEvent) {
    e.preventDefault();
    window.alert(`Do you want to show the ${showAns ? "question" : "answer"}?`);
    setShowAns(!showAns);
    toast.success(
      `Successfully updated the image with ${showAns ? "question" : "answer"}`
    );
  }

  // CONTEXT
  const context = useAuthContext();
  const { team }: ContextType = context;

  React.useEffect(() => {
    if (team.role) {
      if (team.role !== "ADMIN") {
        router.push(`${path.replace(qno, '')}`);
        toast.error("You are not authorized to access the content.");
      }
      else{
        setLoad(!load);
      }
    }
  }, [team]);

  return (
    <div>
      {load && <div className={styles.masterContainer}>
        {!type.startsWith("visual") && (
          <>
            {!showAns && <Component alt="img" URI={QURI} type={type} />}
            {showAns && <Component alt="img" URI={AURI} type={type} />}
          </>
        )}
        {type.match("visualaudio") && !showAns && (
          <Component
            alt="img"
            URI={`/_asset/quiz/${category}/img/${round}-${qno}.png`}
            type={type}
            vURI={`/_asset/quiz/${category}/audio/${round}-${qno}.mp3`}
          />
        )}
        {type.match("visualaudio") && showAns && (
          <Component
            alt="img"
            URI={`/_asset/quiz/${category}/img/${round}-ans-${qno}.png`}
            type={type}
          />
        )}

        {type.match("visualvideoans") && !showAns && (
          <Component
            alt="img"
            URI={`/_asset/quiz/${category}/img/${round}-${qno}.png`}
            type={type}
            vURI={`/_asset/quiz/${category}/video/${round}-${qno}.mp4`}
          />
        )}
        {type.match("visualvideoans") && showAns && (
          <Component
            alt="img"
            URI={`/_asset/quiz/${category}/img/${round}-ans-${qno}.png`}
            vURI={`/_asset/quiz/${category}/video/${round}-ans-${qno}.mp4`}
            type={type}
          />
        )}

        <div className={styles.button}>
          {!prevdisabled && (
            <button
              className={styles.btn}
              onClick={() => {
                router.push(getPrevURL(qno, ans.type));
              }}
            >
              Show Previous
            </button>
          )}
          <button className={styles.btn} onClick={ShowAns}>
            Show {showAns ? "Question" : "Answer"}
          </button>
          {!nextdisabled && (
            <button
              className={styles.btn}
              onClick={() => {
                router.push(getNextURL(qno, ans.type));
              }}
            >
              Show Next
            </button>
          )}
        </div>
      </div>
      }
    </div>
  );
}
