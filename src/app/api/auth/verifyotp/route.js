import { VerifyOtp } from "../../../../../controllers/authController";

export async function POST(req) {
  try {
    return await VerifyOtp(req); // Call your actual controller
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
