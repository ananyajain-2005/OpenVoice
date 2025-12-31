import { Signup } from "../../../../../controllers/authController";

export async function POST(req) {
  try {
    return await Signup(req);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server Error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}