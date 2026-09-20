import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    { success: false, error: "This legacy endpoint has been retired. Sign in and apply through a program page." },
    { status: 410 },
  );
}
