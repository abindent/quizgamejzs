"use client";
// REACT
import React from "react";

// NEXT
import { usePathname, useParams, useSearchParams } from "next/navigation";
import MM from "@/components/website/quiz/question-panel/qp";

export default function Page() {
  const path = usePathname();
  const { id } = useParams();
  const sparam = useSearchParams();
  const type = sparam.get("type");
  return (
    <div>
      <MM
        category="intraschool/junior"
        round={"mm"}
        qno={`${id}`}
        type={`${type}`}
        key={"mm"}
        limit={"8"}
        path={path}
      />
    </div>
  );
}
