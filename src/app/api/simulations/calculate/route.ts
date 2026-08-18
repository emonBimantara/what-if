import { auth } from "@/lib/auth";
import { handleApiError } from "@/lib/api-error";
import { simulationSchema } from "@/lib/validation";
import { createSimulation } from "@/services/simulation.service";

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedBody = simulationSchema.parse(body);

        const result = await createSimulation(
            validatedBody,
            session.user.id
        );

        return Response.json({
            message: "Simulation calculated",
            ...result,
        });
    } catch (error) {
        return handleApiError(error);
    }
}