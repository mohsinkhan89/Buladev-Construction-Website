import { NextResponse, type NextRequest } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getCurrentUser } from "../../../lib/auth";
import { getPool, queryRows } from "../../../lib/db";

type BidSubmissionRow = RowDataPacket & {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  company_type: string;
  primary_trade: string;
  scopes: string;
  service_area: string | null;
  license_certification: string | null;
  insurance_confirmation: number;
  status: string;
  source_page: string;
  created_at: Date;
  updated_at: Date;
};

type BidPayload = {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  companyType?: string;
  primaryTrade?: string;
  scopes?: string;
  serviceArea?: string;
  licenseCertification?: string;
  insuranceConfirmation?: boolean;
  status?: string;
};

function clean(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePayload(payload: BidPayload) {
  const companyName = clean(payload.companyName);
  const contactName = clean(payload.contactName);
  const email = clean(payload.email).toLowerCase();
  const phone = clean(payload.phone);
  const companyType = clean(payload.companyType);
  const primaryTrade = clean(payload.primaryTrade);
  const scopes = clean(payload.scopes);
  const serviceArea = clean(payload.serviceArea);
  const licenseCertification = clean(payload.licenseCertification);
  const status = clean(payload.status) || "new";

  return {
    companyName,
    contactName,
    email,
    phone,
    companyType,
    primaryTrade,
    scopes,
    serviceArea,
    licenseCertification,
    status,
    insuranceConfirmation: payload.insuranceConfirmation ? 1 : 0,
  };
}

export async function GET() {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await queryRows<BidSubmissionRow>(
    `SELECT id, company_name, contact_name, email, phone, company_type, primary_trade, scopes,
            service_area, license_certification, insurance_confirmation, status, source_page,
            created_at, updated_at
     FROM bid_list_submissions
     ORDER BY created_at DESC`,
  );

  return NextResponse.json({ submissions });
}

export async function POST(request: NextRequest) {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = normalizePayload((await request.json()) as BidPayload);

    if (!payload.companyName || !payload.contactName || !payload.email || !payload.phone || !payload.companyType || !payload.primaryTrade || !payload.scopes) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    const [result] = await getPool().execute<ResultSetHeader>(
      `INSERT INTO bid_list_submissions (
        company_name, contact_name, email, phone, company_type, primary_trade, scopes,
        service_area, license_certification, insurance_confirmation, status, source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'dashboard')`,
      [
        payload.companyName,
        payload.contactName,
        payload.email,
        payload.phone,
        payload.companyType,
        payload.primaryTrade,
        payload.scopes,
        payload.serviceArea || null,
        payload.licenseCertification || null,
        payload.insuranceConfirmation,
        payload.status,
      ],
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (error) {
    console.error("Create submission error", error);
    return NextResponse.json({ error: "Unable to create submission." }, { status: 500 });
  }
}
