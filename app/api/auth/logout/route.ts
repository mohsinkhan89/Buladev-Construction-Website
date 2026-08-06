import { NextResponse, type NextRequest } from "next/server";
import { clearSessionCookie } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  clearSessionCookie(response);

  return response;
}
