import type { RowDataPacket } from "mysql2/promise";
import { BarChart3, Building2, ClipboardCheck, FileText, Hammer, LogOut, Mail, UsersRound } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import { queryRows } from "../lib/db";

export const dynamic = "force-dynamic";

type BidSubmissionRow = RowDataPacket & {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  company_type: string;
  primary_trade: string;
  service_area: string | null;
  status: string;
  created_at: Date;
};

type CountRow = RowDataPacket & {
  total: number;
};

const projectRows = [
  ["Detroit Retail Build-Out", "Commercial", "Estimating", "Aug 12"],
  ["Modern Residential Addition", "Residential", "Pre-con", "Aug 15"],
  ["Land Development Package", "Land", "Vendor Review", "Aug 19"],
  ["Corporate Office Refresh", "Commercial", "Scope Review", "Aug 22"],
];

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit" }).format(new Date(value));
}

async function getBidListDashboardData() {
  try {
    const [countRows, submissions] = await Promise.all([
      queryRows<CountRow>("SELECT COUNT(*) AS total FROM bid_list_submissions"),
      queryRows<BidSubmissionRow>(
        `SELECT id, company_name, contact_name, email, phone, company_type, primary_trade, service_area, status, created_at
         FROM bid_list_submissions
         ORDER BY created_at DESC
         LIMIT 8`,
      ),
    ]);

    return {
      total: Number(countRows[0]?.total || 0),
      submissions,
      hasDatabaseError: false,
    };
  } catch (error) {
    console.error("Dashboard bid list query error", error);
    return {
      total: 0,
      submissions: [] as BidSubmissionRow[],
      hasDatabaseError: true,
    };
  }
}

export default async function DashboardPage() {
  const user = getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const bidListData = await getBidListDashboardData();
  const cards = [
    { label: "Bid List Requests", value: String(bidListData.total).padStart(2, "0"), icon: ClipboardCheck, color: "text-ember" },
    { label: "Active Projects", value: "07", icon: Building2, color: "text-sky-500" },
    { label: "Vendor Partners", value: "124", icon: UsersRound, color: "text-emerald-500" },
    { label: "Pending Follow-ups", value: "11", icon: Mail, color: "text-amber-500" },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7f9] text-coal">
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

          {bidListData.hasDatabaseError ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-montserrat text-sm font-semibold text-red-700">
              Bid list submissions could not be loaded. Please check the MySQL connection and table setup.
            </div>
          ) : null}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <p className="font-rajdhani text-sm font-bold uppercase text-ember">Website Leads</p>
                  <h2 className="font-rajdhani text-2xl font-bold uppercase leading-none text-coal">Bid List Submissions</h2>
                </div>
                <ClipboardCheck className="h-6 w-6 text-ember" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left font-montserrat text-sm">
                  <thead className="font-rajdhani text-xs font-bold uppercase text-zinc-500">
                    <tr className="border-b border-zinc-100">
                      <th className="py-3 pr-4">Company</th>
                      <th className="py-3 pr-4">Contact</th>
                      <th className="py-3 pr-4">Trade</th>
                      <th className="py-3 pr-4">Type</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="font-semibold text-zinc-700">
                    {bidListData.submissions.length ? (
                      bidListData.submissions.map((submission) => (
                        <tr className="border-b border-zinc-100 last:border-0" key={submission.id}>
                          <td className="py-4 pr-4 text-coal">
                            <div>{submission.company_name}</div>
                            <a className="text-xs text-zinc-500 hover:text-ember" href={`mailto:${submission.email}`}>
                              {submission.email}
                            </a>
                          </td>
                          <td className="py-4 pr-4">
                            <div>{submission.contact_name}</div>
                            <a className="text-xs text-zinc-500 hover:text-ember" href={`tel:${submission.phone}`}>
                              {submission.phone}
                            </a>
                          </td>
                          <td className="py-4 pr-4">{submission.primary_trade}</td>
                          <td className="py-4 pr-4">{submission.company_type}</td>
                          <td className="py-4 pr-4">
                            <span className="rounded-full bg-orange-50 px-3 py-1 font-rajdhani text-xs font-bold uppercase text-ember">
                              {submission.status}
                            </span>
                          </td>
                          <td className="py-4">{formatDate(submission.created_at)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-8 text-center text-zinc-500" colSpan={6}>
                          No bid list submissions yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="rounded-lg border border-zinc-200 bg-coal p-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
              <span className="inline-flex rounded-full border border-ember/35 bg-ember/15 px-3 py-1 font-rajdhani text-xs font-bold uppercase text-orange-100">
                Admin Profile
              </span>
              <h2 className="mt-4 font-rajdhani text-3xl font-bold uppercase leading-none">{user.name}</h2>
              <p className="mt-2 font-montserrat text-sm font-semibold text-zinc-400">{user.email}</p>
              <div className="mt-6 grid gap-3 font-montserrat text-sm font-semibold text-zinc-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Role</span>
                  <span className="font-rajdhani font-bold uppercase text-ember">{user.role}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Database</span>
                  <span className="font-rajdhani font-bold uppercase text-ember">buladev_db</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bid Requests</span>
                  <span className="font-rajdhani font-bold uppercase text-emerald-400">{bidListData.total}</span>
                </div>
              </div>
            </article>
          </section>

          <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-zinc-100 pb-4">
              <div>
                <p className="font-rajdhani text-sm font-bold uppercase text-ember">Pipeline</p>
                <h2 className="font-rajdhani text-2xl font-bold uppercase leading-none text-coal">Project Activity</h2>
              </div>
              <FileText className="h-6 w-6 text-ember" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left font-montserrat text-sm">
                <thead className="font-rajdhani text-xs font-bold uppercase text-zinc-500">
                  <tr className="border-b border-zinc-100">
                    <th className="py-3 pr-4">Project</th>
                    <th className="py-3 pr-4">Type</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3">Due</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-zinc-700">
                  {projectRows.map(([project, type, status, due]) => (
                    <tr className="border-b border-zinc-100 last:border-0" key={project}>
                      <td className="py-4 pr-4 text-coal">{project}</td>
                      <td className="py-4 pr-4">{type}</td>
                      <td className="py-4 pr-4">
                        <span className="rounded-full bg-orange-50 px-3 py-1 font-rajdhani text-xs font-bold uppercase text-ember">
                          {status}
                        </span>
                      </td>
                      <td className="py-4">{due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
