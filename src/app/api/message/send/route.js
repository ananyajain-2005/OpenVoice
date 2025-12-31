import { sendMessage } from "../../../../../controllers/authController";
export async function POST(req) {
    return await sendMessage(req);
}