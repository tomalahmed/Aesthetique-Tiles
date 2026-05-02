"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await authClient.signUp.email({ name, email, password });

    if (response.error) {
      setError(response.error.message || "Unable to create account.");
      setIsLoading(false);
      return;
    }

    router.push("/my-profile");
    router.refresh();
  };

  return (
    <CardShell className="mx-auto w-full max-w-md space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Create account</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Join Aesthetique Tiles to explore protected collections and save inspirations.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input type="text" name="name" placeholder="Full name" required />
        <Input type="email" name="email" placeholder="Email address" required />
        <Input type="password" name="password" placeholder="Password" minLength={8} required />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
      <p className="text-sm text-[var(--color-text-muted)]">
        Already have an account?{" "}
        <Link href="/login" className="text-[var(--color-primary)] hover:underline">
          Sign in
        </Link>
      </p>
    </CardShell>
  );
}
