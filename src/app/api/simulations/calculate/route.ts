import { calculateSimulation } from "@/lib/financial";
import prisma from "@/lib/prisma";
import { simulationSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
    const simulations = await prisma.simulation.findMany();
    console.log("Simulations:", simulations);
    
    try {
        const body = await request.json();
        const validatedBody = simulationSchema.parse(body);

        const results = validatedBody.scenarios.map((scenario) => {
            return calculateSimulation(
                validatedBody.income,
                validatedBody.expense,
                scenario
            );
        });

        return Response.json({
            message: "Simulation calculated",
            results,
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