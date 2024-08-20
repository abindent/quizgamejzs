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
        round={"oyo"}
        qno={`${id}`}
        type={`${type}`}
        key={"oyo"}
        limit={"8"}
        path={path}
      />
    </div>
  );
}
