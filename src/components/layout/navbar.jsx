"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-tiles", label: "All Tiles" },
  { href: "/my-profile", label: "My Profile" },
];

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="text-xs font-semibold tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Aesthetique Tiles
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-wide text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="text-xs tracking-wide text-[var(--color-text-muted)] uppercase">Loading</span>
          ) : session?.user ? (
            <>
              <Link
                href="/my-profile"
                className="text-xs tracking-[0.18em] text-[var(--color-text-muted)] uppercase transition-colors hover:text-[var(--color-text)]"
              >
                {session.user.name || "Profile"}
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-xs tracking-[0.18em] text-[var(--color-text-muted)] uppercase transition-colors hover:text-[var(--color-text)]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
