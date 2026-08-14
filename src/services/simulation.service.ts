import { calculateSimulation } from "@/lib/financial";
import prisma from "@/lib/prisma";
import type { SimulationType } from "@/lib/validation";

export async function createSimulation(data: SimulationType) {
    const result = await prisma.$transaction(async (tx) => {
        const simulation = await tx.simulation.create({
            data: {
                income: data.income,
                expense: data.expense,
                simulationName: data.simulationName,
                category: data.category,
            },
        });

        const results = await Promise.all(
            data.scenarios.map(async (scenario) => {
                const result = calculateSimulation(
                    data.income,
                    data.expense,
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
        );

        return {
            simulation,
            results,
        };
    });

    return result;
}

export async function getSimulations() {
    return prisma.simulation.findMany({
        include: {
            scenarios: true
        }
    })
}

export async function updateSimulation(
    id: string,
    data: { simulationName: string }
) {
    return prisma.simulation.update({
        where: {
            id
        },
        data: {
            simulationName: data.simulationName
        }
    })
}

export async function deleteSimulation(id: string) {
    return prisma.simulation.delete({
        where: {
            id
        }
    })
}