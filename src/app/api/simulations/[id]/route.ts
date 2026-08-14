import {
    deleteSimulation,
    updateSimulation,
} from "@/services/simulation.service";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const body = await request.json()

    const simulation = await updateSimulation(id, {
        simulationName: body.simulationName
    })

    return Response.json({
        message: "Simulation updated",
        simulation
    })
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const simulation = await deleteSimulation(id)

    return Response.json({
        message: "Simulation Deleted",
        simulation
    })
}