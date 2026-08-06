import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { getCurrentUser } from "../../../lib/auth";
import { queryRows } from "../../../lib/db";

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
};

export async function GET() {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await queryRows<UserRow>(
    `SELECT id, name, email, role, is_active, created_at, updated_at
     FROM users
     ORDER BY created_at DESC`,
  );

  return NextResponse.json({ users });
}
