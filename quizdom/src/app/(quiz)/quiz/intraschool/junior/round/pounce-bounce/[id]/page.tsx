"use client";
// REACT
import React from "react";

// NEXT
import { usePathname, useParams, useSearchParams } from "next/navigation";
import PNB from "@/components/website/quiz/question-panel/qp";

export default function Page() {
  const path = usePathname();
  const { id } = useParams();
  const sparam = useSearchParams();
  const type = sparam.get("type");
  return (
    <div>
      <PNB
        category="intraschool/junior"
        round={"pnb"}
        qno={`${id}`}
        type={`${type}`}
        key={"pnb"}
        limit={"8"}
        path={path}
      />
    </div>
  );
}
