"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

export default function LoginForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const registerHref = `/register?next=${encodeURIComponent(nextPath)}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsEmailLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await authClient.signIn.email({ email, password });

      if (response.error) {
        setError(response.error.message || "Unable to sign in.");
        setIsEmailLoading(false);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Sign in failed. Please try again.");
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: nextPath || "/",
      });

      if (response?.error) {
        setError(response.error.message || "Google login is unavailable right now.");
        setIsGoogleLoading(false);
      }
    } catch {
      setError("Google login is not configured. Use email and password.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <CardShell className="mx-auto w-full max-w-md space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">User Login</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Sign in to access your private tile details and saved preferences.</p>
        <p className="text-xs text-[var(--color-text-muted)]">
          You can reach this page from the navbar Login button or automatically when opening private routes.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input type="email" name="email" placeholder="Email address" required />
        <Input type="password" name="password" placeholder="Password" required />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isEmailLoading || isGoogleLoading}>
          {isEmailLoading ? "Signing In..." : "Login"}
        </Button>
      </form>
      <Button
        type="button"
        variant="subtle"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={isEmailLoading || isGoogleLoading}
      >
        {isGoogleLoading ? "Connecting Google..." : "Continue with Google"}
      </Button>
      <p className="text-sm text-[var(--color-text-muted)]">
        New here?{" "}
        <Link href={registerHref} className="text-[var(--color-primary)] hover:underline">
          Create your account
        </Link>
      </p>
    </CardShell>
  );
}
