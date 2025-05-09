"use client";
// REACT
import React from "react";

// NEXT
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Panel from "@/components/website/quiz/question-panel/qp";

export default function Page() {
  const { id } = useParams();
  const path = usePathname();
  const sparam = useSearchParams();
  const type = sparam.get("type");
  return (
    <div>
      <Panel
        category="interschool"
        round={"pbk"}
        qno={`${id}`}
        type={`${type}`}
        limit={"16"}
        key={"pbk"}
        path={path}
      />
    </div>
  );
}
