import {
    deleteSimulation,
    getSimulationById,
    updateSimulation,
} from "@/services/simulation.service";
import { handleApiError } from "@/lib/api-error";
import { updateSimulationSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;
        const body = await request.json();

        const validatedBody = updateSimulationSchema.parse(body);

        const simulation = await updateSimulation(
            id,
            session.user.id,
            validatedBody
        );

        return Response.json({
            message: "Simulation updated",
            simulation,
        });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;

        const simulation = await deleteSimulation(
            id,
            session.user.id
        );

        return Response.json({
            message: "Simulation Deleted",
            simulation,
        });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;

        const simulation = await getSimulationById(
            id,
            session.user.id
        );


        return Response.json({
            simulation
        })
    } catch (error) {
        return handleApiError(error)
    }
}