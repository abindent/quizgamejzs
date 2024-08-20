"use client";
// REACT
import React from "react";

// NEXT
import { usePathname, useParams, useSearchParams } from "next/navigation";
import OYO from "@/components/website/quiz/question-panel/qp";

export default function Page() {
  const path = usePathname();
  const { id } = useParams();
  const sparam = useSearchParams();
  const type = sparam.get("type");
  return (
    <div>
      <OYO
        category="intraschool/junior"
        round={"oyf"}
        qno={`${id}`}
        type={`${type}`}
        key={"oyf"}
        path={path}
      />
    </div>
  );
}
