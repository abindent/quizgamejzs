"use client";
// REACT
import React from "react";

// NEXT
import { useParams, useSearchParams } from "next/navigation";
import PointBlank from "@/components/website/quiz/question-panel/qp";

export default function Page() {
  const { id } = useParams();
  const sparam = useSearchParams();
  const type = sparam.get("type");
  return (
    <div>
      <PointBlank
        category="interschool"
        round={"pbk"}
        qno={`${id}`}
        type={`${type}`}
        key={"pbk"}
      />
    </div>
  );
}
