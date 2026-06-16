import { AccountPageClient } from "@/components/account/AccountPageClient";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your MangaVerse account settings, preferences, and notifications.",
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AccountPageClient />
      </main>
      <SiteFooter />
    </>
  );
}
