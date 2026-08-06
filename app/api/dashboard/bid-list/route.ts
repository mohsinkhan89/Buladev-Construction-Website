import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { getCurrentUser } from "../../../lib/auth";
import { queryRows } from "../../../lib/db";

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
