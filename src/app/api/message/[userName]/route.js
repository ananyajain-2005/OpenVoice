import { getMessage } from "../../../../../controllers/authController";
export async function GET(req,{params}) {
    const {userName} = await params;
    return await getMessage(userName);
}