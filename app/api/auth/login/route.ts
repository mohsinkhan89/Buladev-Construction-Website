import { NextResponse, type NextRequest } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { setSessionCookie } from "../../../lib/auth";
import { queryRows } from "../../../lib/db";
import { verifyPassword } from "../../../lib/password";

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: number;
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const users = await queryRows<UserRow>(
      "SELECT id, name, email, password_hash, role, is_active FROM users WHERE email = ? LIMIT 1",
      [email.trim().toLowerCase()],
    );
    const user = users[0];

    if (!user || !user.is_active || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true, redirectTo: "/dashboard" });
    setSessionCookie(response, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Login service is not available right now." }, { status: 500 });
  }
}
