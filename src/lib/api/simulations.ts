export type Scenario = {
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
};

export type Simulation = {
    id: string;
    income: number;
    expense: number;
    simulationName: string;
    category: string;
    createdAt: string;
    scenarios: Scenario[];
};

export type SimulationDetailResponse = {
    simulation: Simulation;
};

export type CreateSimulationPayload = {
    simulationName: string;
    category: string;
    income: number;
    expense: number;
    scenarios: {
        name: string;
        price: number;
        dp: number;
        tenor: number;
        interest: number;
    }[];
};

export type CreateSimulationResponse = {
    message: string;
    simulation: Simulation;
};

export async function getSimulations(): Promise<{ simulations: Simulation[] }> {
    const resp = await fetch("http://localhost:3000/api/simulations");
    if (!resp.ok) {
        throw new Error("Failed to fetch simulations");
    }
    return resp.json();
}

export async function getSimulationById(
    id: string
): Promise<SimulationDetailResponse> {
    const resp = await fetch(`http://localhost:3000/api/simulations/${id}`);
    if (!resp.ok) {
        throw new Error("Failed to fetch simulation");
    }
    return resp.json();
}

export async function calculateSimulation(
    payload: CreateSimulationPayload
): Promise<CreateSimulationResponse> {
    const resp = await fetch("http://localhost:3000/api/simulations/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error(
            respData.message || respData.error || "Gagal membuat simulasi"
        );
    }

    return respData;
}

export async function updateSimulation(
    id: string,
    payload: Partial<CreateSimulationPayload>
): Promise<CreateSimulationResponse> {
    const resp = await fetch(`http://localhost:3000/api/simulations/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error(
            respData.message || respData.error || "Gagal memperbarui simulasi"
        );
    }

    return respData;
}

export async function deleteSimulation(
    id: string
): Promise<{ message: string; simulation: Simulation }> {
    const resp = await fetch(`http://localhost:3000/api/simulations/${id}`, {
        method: "DELETE",
    });

    const respData = await resp.json();

    if (!resp.ok) {
        throw new Error(
            respData.message || respData.error || "Gagal menghapus simulasi"
        );
    }

    return respData;
}