"use client";

import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Edit3,
  Eye,
  Hammer,
  Loader2,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

type ActiveView = "dashboard" | "users" | "submissions";
type TableType = "users" | "submissions";

type DashboardUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Counts = {
  users: number;
  bids: number;
  hasDatabaseError: boolean;
};

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

type BidSubmissionRow = {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  company_type: string;
  primary_trade: string;
  scopes: string;
  service_area: string | null;
  license_certification: string | null;
  insurance_confirmation: number;
  status: string;
  source_page: string;
  created_at: string;
  updated_at: string;
};

type ViewItem =
  | { type: "users"; data: UserRow }
  | { type: "submissions"; data: BidSubmissionRow };

type FormModal =
  | { type: "users"; mode: "add"; data?: undefined }
  | { type: "users"; mode: "edit"; data: UserRow }
  | { type: "submissions"; mode: "add"; data?: undefined }
  | { type: "submissions"; mode: "edit"; data: BidSubmissionRow };

const navItems = [
  { key: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { key: "users" as const, label: "Users", icon: UsersRound },
  { key: "submissions" as const, label: "Submissions", icon: ClipboardCheck },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(value));
}

function StatusBadge({ active, label }: { active?: boolean; label?: string }) {
  const text = label || (active ? "active" : "inactive");
  const className = active === false ? "bg-zinc-100 text-zinc-500" : "bg-orange-50 text-ember";
  return <span className={`rounded-full px-2.5 py-1 font-rajdhani text-xs font-bold uppercase ${className}`}>{text}</span>;
}

export default function DashboardWorkspace({ user, initialCounts }: { user: DashboardUser; initialCounts: Counts }) {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [counts, setCounts] = useState(initialCounts);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [submissions, setSubmissions] = useState<BidSubmissionRow[]>([]);
  const [loaded, setLoaded] = useState<Record<TableType, boolean>>({ users: false, submissions: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [viewItem, setViewItem] = useState<ViewItem | null>(null);
  const [formModal, setFormModal] = useState<FormModal | null>(null);

  async function loadTable(type: TableType, force = false) {
    if (loaded[type] && !force) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(type === "users" ? "/api/dashboard/users" : "/api/dashboard/bid-list", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load data.");
        return;
      }

      if (type === "users") {
        const rows = data.users || [];
        setUsers(rows);
        setCounts((current) => ({ ...current, users: rows.length }));
      } else {
        const rows = data.submissions || [];
        setSubmissions(rows);
        setCounts((current) => ({ ...current, bids: rows.length }));
      }
      setLoaded((current) => ({ ...current, [type]: true }));
    } catch {
      setError("Unable to reach dashboard data service.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(type: TableType, id: number) {
    if (!window.confirm("Delete this record?")) return;

    setDeletingKey(`${type}-${id}`);
    setError("");

    try {
      const response = await fetch(`${type === "users" ? "/api/dashboard/users" : "/api/dashboard/bid-list"}/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to delete record.");
        return;
      }

      if (type === "users") {
        setUsers((current) => current.filter((item) => item.id !== id));
        setCounts((current) => ({ ...current, users: Math.max(0, current.users - 1) }));
      } else {
        setSubmissions((current) => current.filter((item) => item.id !== id));
        setCounts((current) => ({ ...current, bids: Math.max(0, current.bids - 1) }));
      }
      setViewItem(null);
    } catch {
      setError("Unable to reach delete service.");
    } finally {
      setDeletingKey(null);
    }
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formModal) return;

    setIsSaving(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const isUser = formModal.type === "users";
    const endpoint = isUser ? "/api/dashboard/users" : "/api/dashboard/bid-list";
    const rowId = formModal.mode === "edit" ? formModal.data.id : null;

    const payload = isUser
      ? {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          role: formData.get("role"),
          isActive: formData.get("isActive") === "yes",
        }
      : {
          companyName: formData.get("companyName"),
          contactName: formData.get("contactName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          companyType: formData.get("companyType"),
          primaryTrade: formData.get("primaryTrade"),
          scopes: formData.get("scopes"),
          serviceArea: formData.get("serviceArea"),
          licenseCertification: formData.get("licenseCertification"),
          insuranceConfirmation: formData.get("insuranceConfirmation") === "yes",
          status: formData.get("status"),
        };

    try {
      const response = await fetch(rowId ? `${endpoint}/${rowId}` : endpoint, {
        method: rowId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to save record.");
        return;
      }

      setFormModal(null);
      await loadTable(formModal.type, true);
    } catch {
      setError("Unable to reach save service.");
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    if (activeView === "users" || activeView === "submissions") {
      void loadTable(activeView);
    }
  }, [activeView]);

  const cards = [
    { label: "Users", value: String(counts.users).padStart(2, "0"), icon: UsersRound, color: "text-emerald-500" },
    { label: "Bid List Requests", value: String(counts.bids).padStart(2, "0"), icon: ClipboardCheck, color: "text-ember" },
    { label: "Active Projects", value: "07", icon: Building2, color: "text-sky-500" },
    { label: "Pending Follow-ups", value: "11", icon: Mail, color: "text-amber-500" },
  ];

  const currentTableType: TableType = activeView === "users" ? "users" : "submissions";
  const tableTitle = activeView === "users" ? "Users" : "Bid List Submissions";

  return (
    <main className="admin-dashboard min-h-screen bg-[#f5f7f9] text-coal">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-zinc-200 bg-coal text-white lg:block">
        <div className="flex h-full flex-col px-5 py-6">
          <a className="mb-9 inline-flex w-56" href="/" aria-label="BULADEV home">
            <img src="/img/logo/logo.png" alt="BULADEV" className="h-auto w-full object-contain" />
          </a>

          <nav className="grid gap-2 font-rajdhani text-sm font-bold uppercase" aria-label="Dashboard sections">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                className={activeView === key ? "dashboard-side-tab is-active" : "dashboard-side-tab"}
                key={key}
                onClick={() => setActiveView(key)}
                type="button"
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
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
            <div className="dashboard-mobile-tabs">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button className={activeView === key ? "is-active" : ""} key={key} onClick={() => setActiveView(key)} type="button">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
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
          {activeView === "dashboard" ? (
            <>
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

              <section className="dashboard-overview-card">
                <div>
                  <p>Quick Access</p>
                  <h2>Manage Database Records</h2>
                </div>
                <div className="dashboard-overview-actions">
                  <button onClick={() => setActiveView("users")} type="button"><UsersRound className="h-4 w-4" />Users</button>
                  <button onClick={() => setActiveView("submissions")} type="button"><ClipboardCheck className="h-4 w-4" />Submissions</button>
                </div>
              </section>
            </>
          ) : (
            <section className="dashboard-tabs rounded-lg border border-zinc-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <div className="dashboard-tabs-header">
                <div>
                  <p className="font-rajdhani text-sm font-bold uppercase text-ember">Database Table</p>
                  <h2 className="font-rajdhani text-2xl font-bold uppercase leading-none text-coal">{tableTitle}</h2>
                </div>
                <div className="dashboard-header-actions">
                  <button className="dashboard-icon-action" onClick={() => loadTable(currentTableType, true)} type="button" aria-label="Refresh table">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </button>
                  <button className="dashboard-add-btn" onClick={() => setFormModal({ type: currentTableType, mode: "add" } as FormModal)} type="button">
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>

              {error ? <div className="dashboard-table-error">{error}</div> : null}

              <div className="dashboard-table-wrap">
                {activeView === "users" ? (
                  <UsersTable
                    currentUserId={user.id}
                    deletingKey={deletingKey}
                    isLoading={isLoading}
                    onDelete={deleteRow}
                    onEdit={(row) => setFormModal({ type: "users", mode: "edit", data: row })}
                    onView={(row) => setViewItem({ type: "users", data: row })}
                    users={users}
                  />
                ) : (
                  <SubmissionsTable
                    deletingKey={deletingKey}
                    isLoading={isLoading}
                    onDelete={deleteRow}
                    onEdit={(row) => setFormModal({ type: "submissions", mode: "edit", data: row })}
                    onView={(row) => setViewItem({ type: "submissions", data: row })}
                    submissions={submissions}
                  />
                )}
              </div>

              <div className="dashboard-table-footer">
                <span>{activeView === "users" ? users.length : submissions.length} records loaded</span>
                <span>Source: {activeView === "users" ? "users" : "bid_list_submissions"}</span>
              </div>
            </section>
          )}
        </div>
      </section>

      {viewItem ? <ViewModal item={viewItem} onClose={() => setViewItem(null)} /> : null}
      {formModal ? <RecordFormModal isSaving={isSaving} modal={formModal} onClose={() => setFormModal(null)} onSubmit={handleFormSubmit} /> : null}
    </main>
  );
}

function UsersTable({ users, currentUserId, deletingKey, isLoading, onView, onEdit, onDelete }: {
  users: UserRow[];
  currentUserId: number;
  deletingKey: string | null;
  isLoading: boolean;
  onView: (row: UserRow) => void;
  onEdit: (row: UserRow) => void;
  onDelete: (type: TableType, id: number) => void;
}) {
  return (
    <table className="dashboard-data-table">
      <thead>
        <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th className="text-right">Actions</th></tr>
      </thead>
      <tbody>
        {isLoading && !users.length ? <LoadingRow colSpan={6} /> : null}
        {!isLoading && !users.length ? <EmptyRow colSpan={6} label="No users found." /> : null}
        {users.map((row) => (
          <tr key={row.id}>
            <td className="text-coal">{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
            <td><StatusBadge active={Boolean(row.is_active)} /></td>
            <td>{formatDate(row.created_at)}</td>
            <td><RowActions canDelete={row.id !== currentUserId} deleteTitle={row.id === currentUserId ? "You cannot delete your current user" : "Delete user"} deleting={deletingKey === `users-${row.id}`} onDelete={() => onDelete("users", row.id)} onEdit={() => onEdit(row)} onView={() => onView(row)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SubmissionsTable({ submissions, deletingKey, isLoading, onView, onEdit, onDelete }: {
  submissions: BidSubmissionRow[];
  deletingKey: string | null;
  isLoading: boolean;
  onView: (row: BidSubmissionRow) => void;
  onEdit: (row: BidSubmissionRow) => void;
  onDelete: (type: TableType, id: number) => void;
}) {
  return (
    <table className="dashboard-data-table is-bid-table">
      <thead>
        <tr><th>Company</th><th>Contact</th><th>Trade</th><th>Type</th><th>Status</th><th>Created</th><th className="text-right">Actions</th></tr>
      </thead>
      <tbody>
        {isLoading && !submissions.length ? <LoadingRow colSpan={7} /> : null}
        {!isLoading && !submissions.length ? <EmptyRow colSpan={7} label="No bid list submissions found." /> : null}
        {submissions.map((row) => (
          <tr key={row.id}>
            <td className="text-coal"><div>{row.company_name}</div><a href={`mailto:${row.email}`}>{row.email}</a></td>
            <td><div>{row.contact_name}</div><a href={`tel:${row.phone}`}>{row.phone}</a></td>
            <td>{row.primary_trade}</td>
            <td>{row.company_type}</td>
            <td><StatusBadge label={row.status} /></td>
            <td>{formatDate(row.created_at)}</td>
            <td><RowActions deleting={deletingKey === `submissions-${row.id}`} onDelete={() => onDelete("submissions", row.id)} onEdit={() => onEdit(row)} onView={() => onView(row)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RowActions({ canDelete = true, deleteTitle = "Delete record", deleting, onView, onEdit, onDelete }: {
  canDelete?: boolean;
  deleteTitle?: string;
  deleting: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="dashboard-actions">
      <button className="dashboard-icon-action" onClick={onView} type="button" aria-label="View record"><Eye className="h-4 w-4" /></button>
      <button className="dashboard-icon-action" onClick={onEdit} type="button" aria-label="Edit record"><Edit3 className="h-4 w-4" /></button>
      <button className="dashboard-icon-action is-danger" disabled={!canDelete || deleting} onClick={onDelete} title={deleteTitle} type="button" aria-label="Delete record">
        {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

function LoadingRow({ colSpan }: { colSpan: number }) {
  return <tr><td colSpan={colSpan} className="dashboard-table-state"><Loader2 className="h-4 w-4 animate-spin" />Loading records...</td></tr>;
}

function EmptyRow({ colSpan, label }: { colSpan: number; label: string }) {
  return <tr><td colSpan={colSpan} className="dashboard-table-state">{label}</td></tr>;
}

function ViewModal({ item, onClose }: { item: ViewItem; onClose: () => void }) {
  const title = item.type === "users" ? "User Details" : "Bid List Submission";
  const rows = item.type === "users"
    ? [["Name", item.data.name], ["Email", item.data.email], ["Role", item.data.role], ["Status", item.data.is_active ? "Active" : "Inactive"], ["Created", formatDate(item.data.created_at)], ["Updated", formatDate(item.data.updated_at)]]
    : [["Company", item.data.company_name], ["Contact", item.data.contact_name], ["Email", item.data.email], ["Phone", item.data.phone], ["Company Type", item.data.company_type], ["Primary Trade", item.data.primary_trade], ["Scopes", item.data.scopes], ["Service Area", item.data.service_area || "-"], ["License / Certification", item.data.license_certification || "-"], ["Insurance", item.data.insurance_confirmation ? "Confirmed" : "Not confirmed"], ["Status", item.data.status], ["Created", formatDate(item.data.created_at)]];

  return <DetailModal eyebrow={item.type === "users" ? "Users Table" : "Bid List Table"} onClose={onClose} rows={rows} title={title} />;
}

function DetailModal({ eyebrow, title, rows, onClose }: { eyebrow: string; title: string; rows: string[][]; onClose: () => void }) {
  return (
    <div className="dashboard-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="dashboard-modal">
        <div className="dashboard-modal-header"><div><p>{eyebrow}</p><h3>{title}</h3></div><button className="dashboard-icon-action" onClick={onClose} type="button" aria-label="Close details"><X className="h-4 w-4" /></button></div>
        <div className="dashboard-detail-grid">{rows.map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}</div>
      </div>
    </div>
  );
}

function RecordFormModal({ modal, isSaving, onSubmit, onClose }: { modal: FormModal; isSaving: boolean; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onClose: () => void }) {
  const title = `${modal.mode === "add" ? "Add" : "Edit"} ${modal.type === "users" ? "User" : "Submission"}`;

  return (
    <div className="dashboard-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <form className="dashboard-modal dashboard-form-modal" onSubmit={onSubmit}>
        <div className="dashboard-modal-header"><div><p>{modal.type === "users" ? "Users Table" : "Bid List Table"}</p><h3>{title}</h3></div><button className="dashboard-icon-action" onClick={onClose} type="button" aria-label="Close form"><X className="h-4 w-4" /></button></div>
        <div className="dashboard-form-grid">{modal.type === "users" ? <UserFields modal={modal} /> : <SubmissionFields modal={modal} />}</div>
        <div className="dashboard-form-actions"><button className="dashboard-cancel-btn" onClick={onClose} type="button">Cancel</button><button className="dashboard-save-btn" disabled={isSaving} type="submit">{isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}{modal.mode === "add" ? "Add" : "Save"}</button></div>
      </form>
    </div>
  );
}

function UserFields({ modal }: { modal: Extract<FormModal, { type: "users" }> }) {
  const row = modal.data;
  return (
    <>
      <label><span>Name *</span><input name="name" required defaultValue={row?.name || ""} /></label>
      <label><span>Email *</span><input name="email" required type="email" defaultValue={row?.email || ""} /></label>
      <label><span>Password {modal.mode === "add" ? "*" : ""}</span><input name="password" required={modal.mode === "add"} type="password" placeholder={modal.mode === "edit" ? "Leave blank to keep current" : "Password"} /></label>
      <label><span>Role</span><input name="role" defaultValue={row?.role || "admin"} /></label>
      <label className="dashboard-check-field"><input name="isActive" type="checkbox" value="yes" defaultChecked={row ? Boolean(row.is_active) : true} /><span>Active user</span></label>
    </>
  );
}

function SubmissionFields({ modal }: { modal: Extract<FormModal, { type: "submissions" }> }) {
  const row = modal.data;
  return (
    <>
      <label><span>Company Name *</span><input name="companyName" required defaultValue={row?.company_name || ""} /></label>
      <label><span>Contact Name *</span><input name="contactName" required defaultValue={row?.contact_name || ""} /></label>
      <label><span>Email *</span><input name="email" required type="email" defaultValue={row?.email || ""} /></label>
      <label><span>Phone *</span><input name="phone" required defaultValue={row?.phone || ""} /></label>
      <label><span>Company Type *</span><input name="companyType" required defaultValue={row?.company_type || ""} /></label>
      <label><span>Primary Trade *</span><input name="primaryTrade" required defaultValue={row?.primary_trade || ""} /></label>
      <label className="dashboard-form-wide"><span>Scopes *</span><textarea name="scopes" required rows={4} defaultValue={row?.scopes || ""} /></label>
      <label><span>Service Area</span><input name="serviceArea" defaultValue={row?.service_area || ""} /></label>
      <label><span>License / Certification</span><input name="licenseCertification" defaultValue={row?.license_certification || ""} /></label>
      <label><span>Status</span><input name="status" defaultValue={row?.status || "new"} /></label>
      <label className="dashboard-check-field"><input name="insuranceConfirmation" type="checkbox" value="yes" defaultChecked={row ? Boolean(row.insurance_confirmation) : false} /><span>Insurance confirmed</span></label>
    </>
  );
}
