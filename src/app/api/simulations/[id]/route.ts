import prisma from "@/lib/prisma"

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const body = await request.json()

    const simulation = await prisma.simulation.update({
        where: {
            id
        },
        data: {
            simulationName: body.simulationName
        }
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
    const {id} = await params
    const simulation = await prisma.simulation.delete({
        where: {
            id
        }
    })

    return Response.json({
        message: "Simulation Deleted",
        simulation
    })
}