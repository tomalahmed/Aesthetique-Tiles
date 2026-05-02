"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

export default function RegisterForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsEmailLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const image = String(formData.get("photoUrl") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await authClient.signUp.email({ name, email, password, image });

      if (response.error) {
        setError(response.error.message || "Unable to create account.");
        setIsEmailLoading(false);
        return;
      }

      router.push(loginHref);
      router.refresh();
    } catch {
      setError("Registration failed. Please try again.");
      setIsEmailLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (response?.error) {
        setError(response.error.message || "Google sign up is unavailable right now.");
        setIsGoogleLoading(false);
      }
    } catch {
      setError("Google sign up is not configured. Use the form to register.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <CardShell className="mx-auto w-full max-w-md space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">User Registration</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Join Aesthetique Tiles to explore protected collections and save inspirations.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input type="text" name="name" placeholder="Full name" required />
        <Input type="email" name="email" placeholder="Email address" required />
        <Input type="url" name="photoUrl" placeholder="Photo URL (https://...)" />
        <Input type="password" name="password" placeholder="Password" minLength={8} required />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isEmailLoading || isGoogleLoading}>
          {isEmailLoading ? "Creating Account..." : "Register"}
        </Button>
      </form>
      <Button
        type="button"
        variant="subtle"
        className="w-full"
        onClick={handleGoogleRegister}
        disabled={isEmailLoading || isGoogleLoading}
      >
        {isGoogleLoading ? "Connecting Google..." : "Continue with Google"}
      </Button>
      <p className="text-sm text-[var(--color-text-muted)]">
        Already have an account?{" "}
        <Link href={loginHref} className="text-[var(--color-primary)] hover:underline">
          Sign in
        </Link>
      </p>
    </CardShell>
  );
}
