import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { sendConfirmationEmail, sendNotificationEmail } from "@/app/lib/email";
import { contactSchema } from "@/app/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    const sql = getDb();

    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        ip_address INET,
        confirmation_sent BOOLEAN DEFAULT FALSE,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    const [row] = await sql`
      INSERT INTO contact_submissions (name, email, subject, message, ip_address)
      VALUES (${name}, ${email}, ${subject}, ${message}, ${ip})
      RETURNING id, created_at
    `;

    let confirmationSent = false;
    try {
      await sendConfirmationEmail({ name, email, subject, message });
      await sendNotificationEmail({ name, email, subject, message });
      confirmationSent = true;

      await sql`
        UPDATE contact_submissions SET confirmation_sent = TRUE WHERE id = ${row.id}
      `;
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        id: row.id,
        confirmationSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
