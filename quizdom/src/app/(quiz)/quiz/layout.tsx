import Layout from "@/layout/quizLayout";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
}
