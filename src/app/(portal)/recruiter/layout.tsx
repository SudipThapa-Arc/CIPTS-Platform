import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PortalSidebar from "@/components/navigation/PortalSidebar";

export default async function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect("/auth/login");
  }

  const { data: recruiter } = await supabase
    .from("recruiters")
    .select("company_name, contact_phone")
    .eq("user_id", authData.user.id)
    .single();

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar
        role="recruiter"
        userName={recruiter?.company_name}
        userEmail={authData.user.email}
      />
      <main className="flex-1 p-5 md:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
