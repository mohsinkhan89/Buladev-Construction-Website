"use client";

import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const data = (await response.json()) as { error?: string; redirectTo?: string };

      if (!response.ok) {
        setError(data.error || "Unable to sign in.");
        return;
      }

      router.push(data.redirectTo || "/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the login service.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label className="font-rajdhani text-sm font-bold uppercase text-zinc-200" htmlFor="email">
          Email Address
        </label>
        <input
          className="h-12 rounded-lg border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-500 focus:border-ember focus:bg-white/[0.14] focus:ring-4 focus:ring-ember/15"
          id="email"
          name="email"
          placeholder="admin@buladev.com"
          required
          type="email"
        />
      </div>

      <div className="grid gap-2">
        <label className="font-rajdhani text-sm font-bold uppercase text-zinc-200" htmlFor="password">
          Password
        </label>
        <input
          className="h-12 rounded-lg border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-500 focus:border-ember focus:bg-white/[0.14] focus:ring-4 focus:ring-ember/15"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          type="password"
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
          {error}
        </div>
      ) : null}

      <button
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-ember to-orange-600 px-5 font-rajdhani text-sm font-bold uppercase text-white shadow-orange-glow transition hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(245,114,22,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
        Sign In
      </button>

      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-semibold text-zinc-300">
        <ShieldCheck className="h-4 w-4 text-ember" />
        Protected with a signed session cookie and MySQL user verification.
      </div>
    </form>
  );
}
