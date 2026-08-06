import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 };

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);

  return [
    "scrypt",
    String(SCRYPT_OPTIONS.N),
    String(SCRYPT_OPTIONS.r),
    String(SCRYPT_OPTIONS.p),
    salt.toString("base64url"),
    key.toString("base64url"),
  ].join("$");
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, n, r, p, saltValue, keyValue] = storedHash.split("$");

  if (algorithm !== "scrypt" || !n || !r || !p || !saltValue || !keyValue) {
    return false;
  }

  const salt = Buffer.from(saltValue, "base64url");
  const expectedKey = Buffer.from(keyValue, "base64url");
  const actualKey = scryptSync(password, salt, expectedKey.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });

  return expectedKey.length === actualKey.length && timingSafeEqual(expectedKey, actualKey);
}
