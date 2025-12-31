import { verifyToken } from "@/app/middleware/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req) {
  const result = verifyToken(req);

  if (result.error) return result.error;

  return NextResponse.json({
    message: "Protected API accessed",
    user: result.user,
  });
}
