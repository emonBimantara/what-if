type Simulation = {
    id: string;
    income: number;
    expense: number;
    simulationName: string;
    category: string;
    createdAt: string;

    scenarios: {
        id: string;
        name: string;
        price: number;
        dp: number;
        tenor: number;
        interest: number;

        loanAmount: number;
        totalInterest: number;
        totalPayment: number;
        monthlyPayment: number;
        remainingCashFlow: number;
        burdenRatio: number;
        burdenLevel: string;

        simulationId: string;
    }[];
};

type SimulationDetailResponse = {
    simulation: Simulation;
};

export async function getSimulations(): Promise<{ simulations: Simulation[] }> {
    const resp = await fetch("http://localhost:3000/api/simulations")
    if (!resp.ok) {
        throw new Error("Failed to fetch simulations");
    }

    const respData = await resp.json()
    return respData
}

export async function getSimulationById(
    id: string
): Promise<SimulationDetailResponse> {
    const resp = await fetch(`http://localhost:3000/api/simulations/${id}`);
    if (!resp.ok) {
        throw new Error("Failed to fetch simulation");
    }

    const respData = await resp.json();
    return respData;
}