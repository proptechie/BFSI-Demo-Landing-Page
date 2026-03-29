import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, phone } = body;

  if (!firstName || !lastName || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    first_name: firstName,
    last_name: lastName,
    phone_number: phone,
    use_case: "lead-reactivation",
    source: "bfsi-demo-landing-page",
    timestamp: new Date().toISOString(),
  };

  // TODO: Forward to Conduit workflow webhook
  // const webhookUrl = process.env.WEBHOOK_LEAD_REACTIVATION;
  // await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

  console.log(`[webhook:lead-reactivation] Submission:`, {
    name: `${firstName} ${lastName[0]}.`,
    use_case: payload.use_case,
    timestamp: payload.timestamp,
  });

  return NextResponse.json({ success: true, use_case: payload.use_case });
}
