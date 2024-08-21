"use client";
// REACT
import React from "react";

// NEXT
import { usePathname, useParams, useSearchParams } from "next/navigation";
import Panel from "@/components/website/quiz/question-panel/qp";

export default function Page() {
  const path = usePathname();
  const { id } = useParams();
  const sparam = useSearchParams();
  const type = sparam.get("type");
  return (
    <div>
      <Panel
        category="intraschool/senior"
        round={"oyf"}
        qno={`${id}`}
        type={`${type}`}
        key={"oyf"}
        limit={"8"}
        path={path}
      />
    </div>
  );
}
