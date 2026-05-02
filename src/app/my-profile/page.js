import Link from "next/link";
import { redirect } from "next/navigation";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getServerSession } from "@/lib/server-session";

export default async function MyProfilePage() {
  const sessionData = await getServerSession();
  const user = sessionData?.session?.user;

  if (!user) {
    redirect("/login?next=/my-profile");
  }

  return (
    <div className="w-full space-y-6">
      <SectionTitle
        eyebrow="Account"
        title={`Hello, ${user.name || "Designer"}`}
        subtitle="Your private workspace for curated tile detail access."
      />
      <CardShell className="space-y-3">
        <p className="text-sm text-[var(--color-text-muted)]">Email: {user.email}</p>
        <Link href="/all-tiles" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
          Explore all tiles
        </Link>
      </CardShell>
    </div>
  );
}
