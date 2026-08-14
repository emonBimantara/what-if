import { calculateSimulation } from "@/lib/financial";
import prisma from "@/lib/prisma";
import { simulationSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedBody = simulationSchema.parse(body);

        const result = await prisma.$transaction(async (tx) => {
            const simulation = await tx.simulation.create({
                data: {
                    income: validatedBody.income,
                    expense: validatedBody.expense,
                    simulationName: validatedBody.simulationName,
                    category: validatedBody.category,
                },
            })

            const results = await Promise.all(
                validatedBody.scenarios.map(async (scenario) => {
                    const result = calculateSimulation(
                        validatedBody.income,
                        validatedBody.expense,
                        scenario
                    );

                    await tx.scenario.create({
                        data: {
                            name: scenario.name,
                            price: scenario.price,
                            dp: scenario.dp,
                            tenor: scenario.tenor,
                            interest: scenario.interest,
                            simulationId: simulation.id,
                        },
                    });

                    return result;
                })
            )

            return {
                simulation,
                results,
            };
        })

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

export async function GET(){
    const simulations = await prisma.simulation.findMany({
        include: {
            scenarios: true
        }
    })

    return Response.json({simulations})
}