import { NextResponse, type NextRequest } from "next/server";
import { getPool } from "../../lib/db";

type ContactRequestPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function clean(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

async function ensureContactRequestsTable() {
  await getPool().execute(`CREATE TABLE IF NOT EXISTS contact_requests (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(60) NULL,
    subject VARCHAR(180) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'new',
    source_page VARCHAR(80) NOT NULL DEFAULT 'contact-us',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY contact_requests_email_index (email),
    KEY contact_requests_status_index (status),
    KEY contact_requests_created_at_index (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactRequestPayload;
    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const subject = clean(payload.subject);
    const message = clean(payload.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    await ensureContactRequestsTable();
    await getPool().execute(
      `INSERT INTO contact_requests (
        name,
        email,
        phone,
        subject,
        message,
        status,
        source_page
      ) VALUES (?, ?, ?, ?, ?, 'new', 'contact-us')`,
      [name, email, phone || null, subject, message],
    );

    return NextResponse.json({ ok: true, message: "Your message has been submitted." });
  } catch (error) {
    console.error("Contact request submit error", error);
    return NextResponse.json({ error: "Unable to submit your message right now." }, { status: 500 });
  }
}
