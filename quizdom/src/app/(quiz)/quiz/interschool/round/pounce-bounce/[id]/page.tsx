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
        round={"pnb"}
        qno={`${id}`}
        type={`${type}`}
        limit={"8"}
        key={"pnb"}
        path={path}
      />
    </div>
  );
}
