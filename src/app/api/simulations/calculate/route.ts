import { handleApiError } from "@/lib/api-error";
import { simulationSchema } from "@/lib/validation";
import { createSimulation } from "@/services/simulation.service";

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