import { Metadata } from 'next';
import Panel from '@/components/website/quiz/panel/question-panel/intraschool/junior/oyf';

// METADATA
export const metadata: Metadata = {
    title: "On Your Fingertips - Intraschool Junior",
    description: "Annual quiz competition of Jalpaiguri Zilla School",
  };

export default function Page() {
  return (
    <div><Panel category="intraschool/junior" /></div>
  )
}
