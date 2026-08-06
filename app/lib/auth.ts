import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type SessionPayload = SessionUser & {
  exp: number;
};

const COOKIE_NAME = "buladev_session";
const SESSION_DAYS = 7;

function getSecret() {
  return process.env.AUTH_SESSION_SECRET || "replace-this-dev-secret-before-launch";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value: string): SessionPayload | null {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }
}

export function createSessionToken(user: SessionUser) {
  const payload = encodePayload({
    ...user,
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function parseSessionToken(token?: string) {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = sign(payload);
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  const session = decodePayload(payload);
  if (!session || session.exp < Date.now()) return null;

  const { exp: _exp, ...user } = session;
  return user;
}

export function getCurrentUser() {
  return parseSessionToken(cookies().get(COOKIE_NAME)?.value);
}

export function setSessionCookie(response: NextResponse, user: SessionUser) {
  response.cookies.set(COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
