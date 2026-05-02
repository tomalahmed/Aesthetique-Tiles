export default function GlobalLoading() {
  return (
    <div className="flex w-full items-center justify-center py-16">
      <div className="surface-card flex items-center gap-3 px-6 py-4">
        <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--color-primary)]" />
        <p className="text-sm text-[var(--color-text-muted)]">Loading tiles experience...</p>
      </div>
    </div>
  );
}
