import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Forward to Speedily webhook (GTM-328)
  console.log("Opt-in submission:", {
    firstName: body.firstName,
    lastInitial: body.lastName?.[0],
    scenario: body.scenario,
  });
  return NextResponse.json({ success: true });
}
