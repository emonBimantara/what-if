import {
    deleteSimulation,
    updateSimulation,
} from "@/services/simulation.service";
import { handleApiError } from "@/lib/api-error";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const simulation = await updateSimulation(id, {
            simulationName: body.simulationName,
        });

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
        const { id } = await params;
        const simulation = await deleteSimulation(id);

        return Response.json({
            message: "Simulation Deleted",
            simulation,
        });
    } catch (error) {
        return handleApiError(error);
    }
}