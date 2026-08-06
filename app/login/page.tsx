import { HardHat, LockKeyhole, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const user = getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-coal text-white">
      <section className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1.02fr_0.98fr]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,24,0.98),rgba(7,16,24,0.9),rgba(7,16,24,0.72)),url('/img/banners/hero-section.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="relative z-10 flex min-h-[46vh] flex-col justify-between px-5 py-6 sm:px-8 lg:min-h-screen lg:px-12 lg:py-10">
          <a className="inline-flex w-56 items-center" href="/" aria-label="BULADEV home">
            <img src="/img/logo/logo.png" alt="BULADEV Building & Land Development" className="h-auto w-full object-contain" />
          </a>

          <div className="max-w-2xl py-12 lg:py-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/15 px-4 py-2 font-rajdhani text-sm font-bold uppercase text-orange-100">
              <ShieldCheck className="h-4 w-4" />
              Admin Access
            </span>
            <h1 className="mt-5 font-rajdhani text-5xl font-bold uppercase leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl">
              Project Control Center
            </h1>
            <p className="mt-5 max-w-lg font-montserrat text-sm font-semibold leading-7 text-zinc-300 sm:text-base">
              Secure dashboard access for BULADEV operations, bid activity, project follow-ups, and client pipeline review.
            </p>
          </div>

          <div className="grid gap-3 text-sm font-semibold text-zinc-300 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
              <HardHat className="mb-3 h-5 w-5 text-ember" />
              Construction-ready UI
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
              <LockKeyhole className="mb-3 h-5 w-5 text-ember" />
              Signed session cookie
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
              <ShieldCheck className="mb-3 h-5 w-5 text-ember" />
              MySQL verified users
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center px-5 pb-10 sm:px-8 lg:min-h-screen lg:p-10">
          <div className="w-full max-w-md rounded-lg border border-white/12 bg-white/[0.08] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7">
            <div className="mb-7 border-b border-white/10 pb-5">
              <span className="font-rajdhani text-sm font-bold uppercase text-ember">Welcome Back</span>
              <h2 className="mt-2 font-rajdhani text-3xl font-bold uppercase leading-none text-white">Sign In</h2>
              <p className="mt-2 font-montserrat text-sm font-semibold leading-6 text-zinc-400">
                Use your admin credentials stored in the MySQL database.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
