import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { getPool } from "../../../../lib/db";

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

function parseId(id: string) {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid submission id." }, { status: 400 });
  }

  try {
    const payload = normalizePayload((await request.json()) as BidPayload);

    if (!payload.companyName || !payload.contactName || !payload.email || !payload.phone || !payload.companyType || !payload.primaryTrade || !payload.scopes) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    await getPool().execute(
      `UPDATE bid_list_submissions
       SET company_name = ?, contact_name = ?, email = ?, phone = ?, company_type = ?, primary_trade = ?,
           scopes = ?, service_area = ?, license_certification = ?, insurance_confirmation = ?, status = ?
       WHERE id = ?`,
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
        id,
      ],
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update submission error", error);
    return NextResponse.json({ error: "Unable to update submission." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid submission id." }, { status: 400 });
  }

  await getPool().execute("DELETE FROM bid_list_submissions WHERE id = ?", [id]);

  return NextResponse.json({ ok: true });
}
