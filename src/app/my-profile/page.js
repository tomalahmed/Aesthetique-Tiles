import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "@/lib/server-session";
import { getFeaturedTiles } from "@/lib/tiles-service";

export default async function MyProfilePage() {
  const sessionData = await getServerSession();
  const user = sessionData?.user ?? sessionData?.session?.user;

  if (!user) {
    redirect("/login?next=/my-profile");
  }

  const showcasedTiles = await getFeaturedTiles(3);

  return (
    <div className="w-full bg-background px-2 py-4 text-foreground md:px-4">
      <div className="mx-auto w-full max-w-[1180px] space-y-8">
        <section className="rounded-sm border border-(--color-border) bg-(--color-surface) p-5 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-(--color-border) bg-background md:h-24 md:w-24">
                {user.image ? (
                  <Image src={user.image} alt={user.name || "Profile"} fill sizes="96px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl font-semibold text-(--color-text-muted)">
                    {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.18em] text-(--color-accent)">PROFESSIONAL ARCHITECT</p>
                <h1 className="text-3xl font-semibold text-foreground md:text-5xl">{user.name || "Designer Profile"}</h1>
                <div className="flex items-center gap-3">
                  <Link
                    href="/my-profile/update"
                    className="border border-(--color-border) bg-(--color-primary) px-4 py-2 text-xs font-semibold tracking-widest text-[#1a1611] transition hover:opacity-90"
                  >
                    EDIT PROFILE
                  </Link>
                  <p className="text-xs text-(--color-text-muted)">{user.email}</p>
                </div>
              </div>
            </div>

            <Link
              href="/all-tiles"
              className="inline-flex items-center justify-center border border-(--color-border) px-4 py-2 text-xs tracking-[0.14em] text-(--color-primary) transition hover:border-(--color-primary)"
            >
              EXPLORE TILES
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 border-y border-(--color-border) py-4 md:grid-cols-3">
          <div className="border border-(--color-border) bg-(--color-surface) px-5 py-5">
            <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">SAVED TEXTURES</p>
            <p className="mt-2 text-4xl text-foreground">{showcasedTiles.length}</p>
          </div>
          <div className="border border-(--color-border) bg-(--color-surface) px-5 py-5">
            <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">PROJECT BOARDS</p>
            <p className="mt-2 text-4xl text-foreground">08</p>
          </div>
          <div className="border border-(--color-border) bg-(--color-surface) px-5 py-5">
            <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">ORDER HISTORY</p>
            <p className="mt-2 text-4xl text-foreground">12</p>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Saved Collections</h2>
            <Link href="/all-tiles" className="text-xs tracking-[0.14em] text-(--color-primary) hover:underline">
              VIEW ALL COLLECTIONS
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {showcasedTiles.map((tile, index) => (
              <article key={tile.id} className={`group overflow-hidden border border-(--color-border) ${index === 0 ? "md:col-span-2" : ""} bg-(--color-surface)`}>
                <div className="relative h-56">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">{tile.material} SURFACE</p>
                  <h3 className="text-xl font-semibold text-foreground">{tile.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-(--color-text-muted)">
                      {tile.dimensions} - ${tile.price.toFixed(2)}
                    </p>
                    <span className="border border-(--color-border) px-2 py-1 text-[10px] text-(--color-primary)">LOVE ❤</span>
                  </div>
                </div>
              </article>
            ))}

            <article className="flex min-h-[320px] flex-col justify-between border border-(--color-border) bg-(--color-surface) p-6">
              <div>
                <p className="text-[10px] tracking-[0.16em] text-(--color-text-muted)">NEW BOARD</p>
                <h3 className="mt-3 max-w-xs text-4xl font-semibold leading-tight text-foreground">
                  Start a new project board with bespoke textures.
                </h3>
              </div>
              <button
                type="button"
                className="mt-4 w-fit border border-(--color-border) bg-(--color-primary) px-5 py-3 text-xs tracking-[0.14em] text-[#1a1611] transition hover:opacity-90"
              >
                CREATE NEW PROJECT
              </button>
            </article>
          </div>
        </section>

        <section className="space-y-4 border-t border-(--color-border) pt-8">
          <h2 className="text-2xl font-semibold text-foreground">Account Settings</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link
              href="/my-profile/update"
              className="flex items-center justify-between border border-(--color-border) bg-(--color-surface) p-4 transition hover:border-(--color-primary)"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">Professional Details</p>
                <p className="text-xs text-(--color-text-muted)">Update your account and firm details.</p>
              </div>
              <span className="text-(--color-primary)">›</span>
            </Link>

            <Link
              href="/my-profile/update"
              className="flex items-center justify-between border border-(--color-border) bg-(--color-surface) p-4 transition hover:border-(--color-primary)"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">Notification Center</p>
                <p className="text-xs text-(--color-text-muted)">Manage product alerts and sample updates.</p>
              </div>
              <span className="text-(--color-primary)">›</span>
            </Link>
          </div>
        </section>
      </div>

    </div>
  );
}
