"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CardShell from "@/components/ui/card-shell";

export default function UpdateInfoForm({ initialName = "", initialImage = "" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const image = String(formData.get("image") ?? "");

    try {
      const response = await authClient.updateUser({ name, image });

      if (response?.error) {
        setError(response.error.message || "Unable to update profile information.");
        setIsLoading(false);
        return;
      }

      setSuccess("Profile information updated successfully.");
      router.push("/my-profile");
      router.refresh();
    } catch {
      setError("Update failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <CardShell className="mx-auto w-full max-w-xl space-y-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input type="text" name="name" defaultValue={initialName} placeholder="Name" required />
        <Input type="url" name="image" defaultValue={initialImage} placeholder="Image URL (https://...)" />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Information"}
        </Button>
      </form>
    </CardShell>
  );
}
