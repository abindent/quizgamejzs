import { Metadata } from 'next';
import Panel from '@/components/website/quiz/panel';

// METADATA
export const metadata: Metadata = {
    title: "Quiz Panel - Quizdom",
    description: "Annual quiz competition of Jalpaiguri Zilla School",
  };

export default function Page() {
  return (
    <div><Panel/></div>
  )
}
