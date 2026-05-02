"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

export default function LoginForm({ nextPath = "/my-profile" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await authClient.signIn.email({ email, password });

    if (response.error) {
      setError(response.error.message || "Unable to sign in.");
      setIsLoading(false);
      return;
    }

    router.push(nextPath);
    router.refresh();
  };

  return (
    <CardShell className="mx-auto w-full max-w-md space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Welcome back</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Sign in to access your private tile details and saved preferences.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input type="email" name="email" placeholder="Email address" required />
        <Input type="password" name="password" placeholder="Password" required />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <p className="text-sm text-[var(--color-text-muted)]">
        New here?{" "}
        <Link href="/register" className="text-[var(--color-primary)] hover:underline">
          Create your account
        </Link>
      </p>
    </CardShell>
  );
}
