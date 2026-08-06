import { NextResponse, type NextRequest } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getCurrentUser } from "../../../lib/auth";
import { getPool, queryRows } from "../../../lib/db";
import { hashPassword } from "../../../lib/password";

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
};

type UserPayload = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
};

function clean(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

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

export async function POST(request: NextRequest) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as UserPayload;
    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const password = clean(payload.password);
    const role = clean(payload.role) || "admin";
    const isActive = payload.isActive === false ? 0 : 1;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    const [result] = await getPool().execute<ResultSetHeader>(
      `INSERT INTO users (name, email, password_hash, role, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashPassword(password), role, isActive],
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }

    console.error("Create user error", error);
    return NextResponse.json({ error: "Unable to create user." }, { status: 500 });
  }
}
