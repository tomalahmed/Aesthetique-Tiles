import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
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
        subtitle="View your profile details and keep your account information up to date."
      />
      <CardShell className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-[128px_1fr] sm:items-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)]">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-2xl font-semibold text-[var(--color-text-muted)]">
                {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="rounded-sm border border-[var(--color-border)] px-4 py-3">
              <p className="text-[11px] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">Name</p>
              <p className="mt-1 text-base font-semibold text-[var(--color-text)]">{user.name || "Not set"}</p>
            </div>
            <div className="rounded-sm border border-[var(--color-border)] px-4 py-3">
              <p className="text-[11px] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">Email</p>
              <p className="mt-1 text-base font-semibold text-[var(--color-text)]">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-4">
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
