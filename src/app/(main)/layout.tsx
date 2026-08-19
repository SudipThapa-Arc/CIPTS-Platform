import TopNavBar from "@/components/navigation/TopNavBar";
import Footer from "@/components/navigation/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavBar />
      {children}
      <Footer />
    </>
  );
}
