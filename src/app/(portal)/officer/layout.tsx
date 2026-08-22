import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PortalSidebar from "@/components/navigation/PortalSidebar";

export default async function OfficerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", authData.user.id)
    .single();

  if (profile?.role !== "OFFICER") {
    redirect("/student/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar
        role="officer"
        userName="Placement Officer"
        userEmail={authData.user.email}
      />
      <main className="flex-1 p-5 md:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
