import {
    deleteSimulation,
    getSimulationById,
    updateSimulation,
} from "@/services/simulation.service";
import { handleApiError } from "@/lib/api-error";
import { updateSimulationSchema } from "@/lib/validation";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const validatedBody = updateSimulationSchema.parse(body);

        const simulation = await updateSimulation(id, validatedBody);

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

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const simulation = await getSimulationById(id)

        return Response.json({
            simulation
        })
    } catch (error) {
        return handleApiError(error)
    }
}