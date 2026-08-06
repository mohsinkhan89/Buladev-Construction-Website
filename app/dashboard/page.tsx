import type { RowDataPacket } from "mysql2/promise";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import { queryRows } from "../lib/db";
import DashboardWorkspace from "./DashboardWorkspace";

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

  return <DashboardWorkspace initialCounts={counts} user={user} />;
}
