import Layout from "@/layout/qnaLayout";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
}
