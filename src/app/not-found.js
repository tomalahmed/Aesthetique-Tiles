import Link from "next/link";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

export default function NotFoundPage() {
  return (
    <div className="flex w-full items-center justify-center py-14">
      <CardShell className="w-full max-w-xl space-y-4 text-center">
        <p className="text-xs tracking-[0.18em] text-(--color-accent) uppercase">404</p>
        <h1 className="text-3xl font-semibold text-(--color-text)">Page not found</h1>
        <p className="text-sm text-(--color-text-muted)">
          The page you requested does not exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Button as={Link} href="/">
            Back to Home
          </Button>
        </div>
      </CardShell>
    </div>
  );
}
