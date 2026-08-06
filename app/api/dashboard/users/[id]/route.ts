import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { getPool } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/password";

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

function parseId(id: string) {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid user id." }, { status: 400 });
  }

  try {
    const payload = (await request.json()) as UserPayload;
    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const password = clean(payload.password);
    const role = clean(payload.role) || "admin";
    const isActive = payload.isActive === false ? 0 : 1;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (password) {
      await getPool().execute(
        `UPDATE users
         SET name = ?, email = ?, password_hash = ?, role = ?, is_active = ?
         WHERE id = ?`,
        [name, email, hashPassword(password), role, isActive, id],
      );
    } else {
      await getPool().execute(
        `UPDATE users
         SET name = ?, email = ?, role = ?, is_active = ?
         WHERE id = ?`,
        [name, email, role, isActive, id],
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }

    console.error("Update user error", error);
    return NextResponse.json({ error: "Unable to update user." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid user id." }, { status: 400 });
  }

  if (id === user.id) {
    return NextResponse.json({ error: "You cannot delete the user you are currently logged in with." }, { status: 400 });
  }

  await getPool().execute("DELETE FROM users WHERE id = ?", [id]);

  return NextResponse.json({ ok: true });
}
