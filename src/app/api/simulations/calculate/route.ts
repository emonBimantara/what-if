import prisma from "@/lib/prisma";
import { simulationSchema } from "@/lib/validation";
import { ZodError } from "zod";
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
        if (error instanceof ZodError) {
            return Response.json({
                error: "Validation failed",
                details: error.issues,
            }, { status: 400 })
        }
        return Response.json({
            error: "Internal server error",
        }, { status: 500 });
    }
}

export async function GET() {
    const simulations = await getSimulations()
    return Response.json({ simulations })
}