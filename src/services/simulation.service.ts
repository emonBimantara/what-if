import { Prisma } from "@/generated/prisma/client";
import { NotFoundError } from "@/lib/errors";
import { calculateSimulation } from "@/lib/financial";
import prisma from "@/lib/prisma";
import type { SimulationType } from "@/lib/validation";

export async function createSimulation(data: SimulationType, userId: string) {
    const result = await prisma.$transaction(async (tx) => {
        const simulation = await tx.simulation.create({
            data: {
                income: data.income,
                expense: data.expense,
                simulationName: data.simulationName,
                category: data.category,
                userId,
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
                        loanAmount: result.loanAmount,
                        totalInterest: result.totalInterest,
                        totalPayment: result.totalPayment,
                        monthlyPayment: result.monthlyPayment,
                        remainingCashFlow: result.remainingCashFlow,
                        burdenRatio: result.burdenRatio,
                        burdenLevel: result.burdenLevel,
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

export async function getSimulations(userId: string) {
    return prisma.simulation.findMany({
        where: {
            userId,
        },
        include: {
            scenarios: true,
        },
    });
}

export async function getSimulationById(id: string, userId: string) {
    try {
        const simulation = await prisma.simulation.findFirst({
            where: {
                id,
                userId
            },
            include: {
                scenarios: true,
            },
        });

        if (!simulation) {
            throw new NotFoundError("Simulation not found");
        }

        return simulation;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError("Simulation not found");
        }

        throw error;
    }
}

export async function updateSimulation(
    id: string,
    userId: string,
    data: SimulationType
) {
    const simulation = await prisma.simulation.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!simulation) {
        throw new NotFoundError("Simulation not found");
    }

    return prisma.$transaction(async (tx) => {
        const updatedSimulation = await tx.simulation.update({
            where: {
                id,
            },
            data: {
                income: data.income,
                expense: data.expense,
                simulationName: data.simulationName,
                category: data.category,
            },
        });

        // Hapus scenario lama
        await tx.scenario.deleteMany({
            where: {
                simulationId: id,
            },
        });

        // Buat ulang scenario berdasarkan input terbaru
        await Promise.all(
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

                        loanAmount: result.loanAmount,
                        totalInterest: result.totalInterest,
                        totalPayment: result.totalPayment,
                        monthlyPayment: result.monthlyPayment,
                        remainingCashFlow: result.remainingCashFlow,
                        burdenRatio: result.burdenRatio,
                        burdenLevel: result.burdenLevel,

                        simulationId: id,
                    },
                });
            })
        );

        return updatedSimulation;
    });
}

export async function deleteSimulation(
    id: string,
    userId: string
) {
    const simulation = await prisma.simulation.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!simulation) {
        throw new NotFoundError("Simulation not found");
    }

    return prisma.simulation.delete({
        where: {
            id,
        },
    });
}