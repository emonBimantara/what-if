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

export type SimulationItem = {
    id: string;
    simulationName: string;
    category: string;
    income: number;
    expense: number;
    createdAt?: string;
    scenarios: {
        id: string;
        name: string;
        monthlyPayment?: number;
    }[];
};

export interface ScenarioFormItem {
    id: string;
    name: string;
    price: string;
    dp: string;
    tenor: string;
    interest: string;
}
