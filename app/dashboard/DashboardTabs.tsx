"use client";

import { ClipboardCheck, Eye, Loader2, RefreshCw, Trash2, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";

type TabKey = "users" | "bidList";

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
  | { type: "bidList"; data: BidSubmissionRow };

const tabs = [
  { key: "users" as const, label: "Users", icon: UsersRound },
  { key: "bidList" as const, label: "Bid List Submissions", icon: ClipboardCheck },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function StatusBadge({ active, label }: { active?: boolean; label?: string }) {
  const text = label || (active ? "active" : "inactive");
  const className = active === false
    ? "bg-zinc-100 text-zinc-500"
    : "bg-orange-50 text-ember";

  return <span className={`rounded-full px-2.5 py-1 font-rajdhani text-xs font-bold uppercase ${className}`}>{text}</span>;
}

export default function DashboardTabs({ currentUserId }: { currentUserId: number }) {
  const [activeTab, setActiveTab] = useState<TabKey>("users");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [submissions, setSubmissions] = useState<BidSubmissionRow[]>([]);
  const [loadedTabs, setLoadedTabs] = useState<Record<TabKey, boolean>>({ users: false, bidList: false });
  const [isLoading, setIsLoading] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [viewItem, setViewItem] = useState<ViewItem | null>(null);


  async function loadTab(tab: TabKey, force = false) {
    if (loadedTabs[tab] && !force) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(tab === "users" ? "/api/dashboard/users" : "/api/dashboard/bid-list", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load table data.");
        return;
      }

      if (tab === "users") {
        setUsers(data.users || []);
      } else {
        setSubmissions(data.submissions || []);
      }

      setLoadedTabs((current) => ({ ...current, [tab]: true }));
    } catch {
      setError("Unable to reach dashboard data service.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(type: TabKey, id: number) {
    if (!window.confirm("Delete this record?")) return;

    setDeletingKey(`${type}-${id}`);
    setError("");

    try {
      const response = await fetch(`${type === "users" ? "/api/dashboard/users" : "/api/dashboard/bid-list"}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to delete record.");
        return;
      }

      if (type === "users") {
        setUsers((current) => current.filter((item) => item.id !== id));
      } else {
        setSubmissions((current) => current.filter((item) => item.id !== id));
      }
      setViewItem(null);
    } catch {
      setError("Unable to reach delete service.");
    } finally {
      setDeletingKey(null);
    }
  }

  useEffect(() => {
    void loadTab(activeTab);
  }, [activeTab]);

  const visibleRows = activeTab === "users" ? users : submissions;

  return (
    <section className="dashboard-tabs mt-5 rounded-lg border border-zinc-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
      <div className="dashboard-tabs-header">
        <div>
          <p className="font-rajdhani text-sm font-bold uppercase text-ember">Database Tables</p>
          <h2 className="font-rajdhani text-2xl font-bold uppercase leading-none text-coal">Records Manager</h2>
        </div>
        <button className="dashboard-icon-action" onClick={() => loadTab(activeTab, true)} type="button" aria-label="Refresh table">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </button>
      </div>

      <div className="dashboard-tab-list" role="tablist" aria-label="Dashboard database tables">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            aria-selected={activeTab === key}
            className={activeTab === key ? "dashboard-tab is-active" : "dashboard-tab"}
            key={key}
            onClick={() => setActiveTab(key)}
            role="tab"
            type="button"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {error ? <div className="dashboard-table-error">{error}</div> : null}

      <div className="dashboard-table-wrap">
        {activeTab === "users" ? (
          <table className="dashboard-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && !users.length ? <LoadingRow colSpan={6} /> : null}
              {!isLoading && !users.length ? <EmptyRow colSpan={6} label="No users found." /> : null}
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-coal">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><StatusBadge active={Boolean(user.is_active)} /></td>
                  <td>{formatDate(user.created_at)}</td>
                  <td>
                    <div className="dashboard-actions">
                      <button className="dashboard-icon-action" onClick={() => setViewItem({ type: "users", data: user })} type="button" aria-label="View user">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="dashboard-icon-action is-danger"
                        disabled={user.id === currentUserId || deletingKey === `users-${user.id}`}
                        onClick={() => deleteRow("users", user.id)}
                        type="button"
                        aria-label="Delete user"
                        title={user.id === currentUserId ? "You cannot delete your current user" : "Delete user"}
                      >
                        {deletingKey === `users-${user.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="dashboard-data-table is-bid-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Trade</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && !submissions.length ? <LoadingRow colSpan={7} /> : null}
              {!isLoading && !submissions.length ? <EmptyRow colSpan={7} label="No bid list submissions found." /> : null}
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="text-coal">
                    <div>{submission.company_name}</div>
                    <a href={`mailto:${submission.email}`}>{submission.email}</a>
                  </td>
                  <td>
                    <div>{submission.contact_name}</div>
                    <a href={`tel:${submission.phone}`}>{submission.phone}</a>
                  </td>
                  <td>{submission.primary_trade}</td>
                  <td>{submission.company_type}</td>
                  <td><StatusBadge label={submission.status} /></td>
                  <td>{formatDate(submission.created_at)}</td>
                  <td>
                    <div className="dashboard-actions">
                      <button className="dashboard-icon-action" onClick={() => setViewItem({ type: "bidList", data: submission })} type="button" aria-label="View submission">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="dashboard-icon-action is-danger"
                        disabled={deletingKey === `bidList-${submission.id}`}
                        onClick={() => deleteRow("bidList", submission.id)}
                        type="button"
                        aria-label="Delete submission"
                      >
                        {deletingKey === `bidList-${submission.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="dashboard-table-footer">
        <span>{visibleRows.length} records loaded</span>
        <span>Source: {activeTab === "users" ? "users" : "bid_list_submissions"}</span>
      </div>

      {viewItem ? <ViewModal item={viewItem} onClose={() => setViewItem(null)} /> : null}
    </section>
  );
}

function LoadingRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="dashboard-table-state">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading records...
      </td>
    </tr>
  );
}

function EmptyRow({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="dashboard-table-state">
        {label}
      </td>
    </tr>
  );
}

function ViewModal({ item, onClose }: { item: ViewItem; onClose: () => void }) {
  const title = item.type === "users" ? "User Details" : "Bid List Submission";
  const rows = item.type === "users"
    ? [
        ["Name", item.data.name],
        ["Email", item.data.email],
        ["Role", item.data.role],
        ["Status", item.data.is_active ? "Active" : "Inactive"],
        ["Created", formatDate(item.data.created_at)],
        ["Updated", formatDate(item.data.updated_at)],
      ]
    : [
        ["Company", item.data.company_name],
        ["Contact", item.data.contact_name],
        ["Email", item.data.email],
        ["Phone", item.data.phone],
        ["Company Type", item.data.company_type],
        ["Primary Trade", item.data.primary_trade],
        ["Scopes", item.data.scopes],
        ["Service Area", item.data.service_area || "-"],
        ["License / Certification", item.data.license_certification || "-"],
        ["Insurance", item.data.insurance_confirmation ? "Confirmed" : "Not confirmed"],
        ["Status", item.data.status],
        ["Created", formatDate(item.data.created_at)],
      ];

  return (
    <div className="dashboard-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="dashboard-modal">
        <div className="dashboard-modal-header">
          <div>
            <p>{item.type === "users" ? "Users Table" : "Bid List Table"}</p>
            <h3>{title}</h3>
          </div>
          <button className="dashboard-icon-action" onClick={onClose} type="button" aria-label="Close details">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="dashboard-detail-grid">
          {rows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
