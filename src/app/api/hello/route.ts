import {
    calculateBurdenLevel,
    calculateBurdenRatio,
    calculateLoanAmount,
    calculateMonthlyPayment,
    calculateRemainingCashFlow,
} from "@/lib/financial";
import { simulationSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        simulationSchema.parse(body);

        const firstScenario = body.scenarios[0];

        const loanAmount = calculateLoanAmount(
            firstScenario.price,
            firstScenario.dp
        );

        const monthlyPayment = calculateMonthlyPayment(
            loanAmount,
            firstScenario.tenor,
            firstScenario.interest
        );

        const remainingCashFlow = calculateRemainingCashFlow(
            body.income,
            body.expense,
            monthlyPayment
        );

        const burdenRatio = calculateBurdenRatio(
            monthlyPayment,
            body.income
        )

        const burdenLevel = calculateBurdenLevel(burdenRatio);

        return Response.json({
            message: "Simulation calculated",
            result: {
                loanAmount,
                monthlyPayment,
                remainingCashFlow,
                burdenRatio,
                burdenLevel,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({
                error: "Validation failed",
                details: error.issues,
            }, { status: 400 })
        }
        return Response.json({
            message: "Invalid Age",
        }, { status: 400 })
    }
}