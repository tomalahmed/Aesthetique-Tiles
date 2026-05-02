import { cn } from "@/lib/cn";

export default function CardShell({ className, children }) {
  return <article className={cn("surface-card p-5", className)}>{children}</article>;
}
