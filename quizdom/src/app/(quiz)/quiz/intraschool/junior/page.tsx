import { Metadata } from 'next';
import Panel from '@/components/website/quiz/panel/intrajr';

// METADATA
export const metadata: Metadata = {
    title: "Intraschool Junior - Quizdom",
    description: "Annual quiz competition of Jalpaiguri Zilla School",
  };

export default function Page() {
  return (
    <div><Panel/></div>
  )
}
