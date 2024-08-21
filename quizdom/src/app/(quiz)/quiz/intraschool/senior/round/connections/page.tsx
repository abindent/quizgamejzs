import { Metadata } from 'next';
import Panel from '@/components/website/quiz/panel/question-panel/intraschool/junior/cc';

// METADATA
export const metadata: Metadata = {
    title: "Connections - Intraschool Seniotr",
    description: "Annual quiz competition of Jalpaiguri Zilla School",
  };

export default function Page() {
  return (
    <div><Panel category="intraschool/senior" /></div>
  )
}
