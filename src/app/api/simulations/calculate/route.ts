import { handleApiError } from "@/lib/api-error";
import { simulationSchema } from "@/lib/validation";
import {
    createSimulation,
    getSimulations,
} from "@/services/simulation.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedBody = simulationSchema.parse(body);
        const result = await createSimulation(validatedBody)

        return Response.json({
            message: "Simulation calculated",
            ...result,
        });
    } catch (error) {
        return handleApiError(error);
    }
}

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