import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { getPool } from "../../../../lib/db";

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid user id." }, { status: 400 });
  }

  if (id === user.id) {
    return NextResponse.json({ error: "You cannot delete the user you are currently logged in with." }, { status: 400 });
  }

  await getPool().execute("DELETE FROM users WHERE id = ?", [id]);

  return NextResponse.json({ ok: true });
}
