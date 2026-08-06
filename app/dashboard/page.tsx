import type { RowDataPacket } from "mysql2/promise";
import { BarChart3, Building2, ClipboardCheck, Hammer, LogOut, Mail, UsersRound } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import { queryRows } from "../lib/db";
import DashboardTabs from "./DashboardTabs";

export const dynamic = "force-dynamic";

type CountRow = RowDataPacket & {
  total: number;
};

async function getDashboardCounts() {
  try {
    const [userRows, bidRows] = await Promise.all([
      queryRows<CountRow>("SELECT COUNT(*) AS total FROM users"),
      queryRows<CountRow>("SELECT COUNT(*) AS total FROM bid_list_submissions"),
    ]);

    return {
      users: Number(userRows[0]?.total || 0),
      bids: Number(bidRows[0]?.total || 0),
      hasDatabaseError: false,
    };
  } catch (error) {
    console.error("Dashboard count query error", error);
    return {
      users: 0,
      bids: 0,
      hasDatabaseError: true,
    };
  }
}

export default async function DashboardPage() {
  const user = getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const counts = await getDashboardCounts();
  const cards = [
    { label: "Users", value: String(counts.users).padStart(2, "0"), icon: UsersRound, color: "text-emerald-500" },
    { label: "Bid List Requests", value: String(counts.bids).padStart(2, "0"), icon: ClipboardCheck, color: "text-ember" },
    { label: "Active Projects", value: "07", icon: Building2, color: "text-sky-500" },
    { label: "Pending Follow-ups", value: "11", icon: Mail, color: "text-amber-500" },
  ];

  return (
    <main className="admin-dashboard min-h-screen bg-[#f5f7f9] text-coal">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-zinc-200 bg-coal text-white lg:block">
        <div className="flex h-full flex-col px-5 py-6">
          <a className="mb-9 inline-flex w-56" href="/" aria-label="BULADEV home">
            <img src="/img/logo/logo.png" alt="BULADEV" className="h-auto w-full object-contain" />
          </a>

          <nav className="grid gap-2 font-rajdhani text-sm font-bold uppercase">
            <a className="flex items-center gap-3 rounded-lg bg-ember px-4 py-3 text-white shadow-orange-glow" href="/dashboard">
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </a>
            <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-white/10 hover:text-white" href="/#bid-list">
              <ClipboardCheck className="h-5 w-5" />
              Bid List
            </a>
            <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-white/10 hover:text-white" href="/#projects">
              <Hammer className="h-5 w-5" />
              Projects
            </a>
            <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-white/10 hover:text-white" href="/#contact">
              <Mail className="h-5 w-5" />
              Contact
            </a>
          </nav>

          <form action="/api/auth/logout" method="post" className="mt-auto">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 font-rajdhani text-sm font-bold uppercase text-zinc-200 transition hover:border-ember/50 hover:text-white" type="submit">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-rajdhani text-sm font-bold uppercase text-ember">BULADEV Dashboard</p>
              <h1 className="font-rajdhani text-3xl font-bold uppercase leading-none text-coal">Welcome, {user.name}</h1>
            </div>
            <form action="/api/auth/logout" method="post" className="lg:hidden">
              <button className="inline-flex items-center gap-2 rounded-lg bg-coal px-4 py-2 font-rajdhani text-sm font-bold uppercase text-white" type="submit">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </header>

        <div className="px-5 py-6 lg:px-8 lg:py-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map(({ label, value, icon: Icon, color }) => (
              <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)]" key={label}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-rajdhani text-sm font-bold uppercase text-zinc-500">{label}</p>
                    <h2 className="mt-3 font-rajdhani text-4xl font-bold leading-none text-coal">{value}</h2>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-zinc-100">
                    <Icon className={`h-6 w-6 ${color}`} />
                  </span>
                </div>
              </article>
            ))}
          </section>

          {counts.hasDatabaseError ? (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-montserrat text-sm font-semibold text-red-700">
              Dashboard counts could not be loaded. Please check the MySQL connection.
            </div>
          ) : null}

          <DashboardTabs currentUserId={user.id} />
        </div>
      </section>
    </main>
  );
}
