import Link from "next/link";
import { redirect } from "next/navigation";
import CardShell from "@/components/ui/card-shell";
import SectionTitle from "@/components/ui/section-title";
import { getServerSession } from "@/lib/server-session";
import Button from "@/components/ui/button";

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
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="h-20 w-20 rounded-sm border border-[var(--color-border)] object-cover"
          />
        ) : null}
        <p className="text-sm text-[var(--color-text-muted)]">Name: {user.name || "Not set"}</p>
        <p className="text-sm text-[var(--color-text-muted)]">Email: {user.email}</p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button as={Link} href="/my-profile/update" variant="subtle">
            Update Information
          </Button>
          <Link href="/all-tiles" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
            Explore all tiles
          </Link>
        </div>
      </CardShell>
    </div>
  );
}
