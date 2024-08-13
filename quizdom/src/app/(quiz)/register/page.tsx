import { Metadata } from "next";
import Register from "@/components/website/register";

// METADATA
export const metadata: Metadata = {
  title: "Register - Quizdom",
  description: "Annual quiz competition of Jalpaiguri Zilla School",
};

export default function Page() {
  return (
    <div><Register /></div>
    
  );
}
