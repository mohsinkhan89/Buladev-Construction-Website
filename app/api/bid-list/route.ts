import { NextResponse, type NextRequest } from "next/server";
import { getPool } from "../../lib/db";

type BidListPayload = {
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
};

function clean(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as BidListPayload;
    const companyName = clean(payload.companyName);
    const contactName = clean(payload.contactName);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const companyType = clean(payload.companyType);
    const primaryTrade = clean(payload.primaryTrade);
    const scopes = clean(payload.scopes);
    const serviceArea = clean(payload.serviceArea);
    const licenseCertification = clean(payload.licenseCertification);

    if (!companyName || !contactName || !email || !phone || !companyType || !primaryTrade || !scopes) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    await getPool().execute(
      `INSERT INTO bid_list_submissions (
        company_name,
        contact_name,
        email,
        phone,
        company_type,
        primary_trade,
        scopes,
        service_area,
        license_certification,
        insurance_confirmation,
        status,
        source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', 'website')`,
      [
        companyName,
        contactName,
        email,
        phone,
        companyType,
        primaryTrade,
        scopes,
        serviceArea || null,
        licenseCertification || null,
        payload.insuranceConfirmation ? 1 : 0,
      ],
    );

    return NextResponse.json({ ok: true, message: "Your bid list request has been submitted." });
  } catch (error) {
    console.error("Bid list submit error", error);
    return NextResponse.json({ error: "Unable to submit your request right now." }, { status: 500 });
  }
}
