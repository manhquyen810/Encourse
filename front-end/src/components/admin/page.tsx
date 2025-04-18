"use client";

import Footer from "../../components/admin/layout/Footer";
import Header from "../../components/admin/layout/Header";

export default function AdminPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col mt-12">
        <div className="flex-grow">{children}</div>
      </main>
      <Footer />
    </>
  );
}
