import { auth } from "@/lib/auth";
import { getSimulations } from "@/services/simulation.service";
import { handleApiError } from "@/lib/api-error";

export async function GET(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        console.log("SESSION:", session);

        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const simulations = await getSimulations(session.user.id);

        return Response.json({
            simulations,
        });
    } catch (error) {
        return handleApiError(error);
    }
}