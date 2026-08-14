import { getSimulations } from "@/services/simulation.service";
import { handleApiError } from "@/lib/api-error";

export async function GET() {
    try {
        const simulations = await getSimulations();

        return Response.json({
            simulations,
        });
    } catch (error) {
        return handleApiError(error);
    }
}