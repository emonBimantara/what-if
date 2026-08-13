import { Scenario } from "./validation";

//jumlah pokok utang murni 
export function calculateLoanAmount(price: number, dp: number): number {
    return price - dp;
}

//bunga per tahun (annualInterest) + total bunga selama masa tenor (totalInterest).
export function calculateTotalInterest(
    loanAmount: number,
    tenor: number,
    annualInterestRate: number
) {
    const annualInterest = loanAmount * (annualInterestRate / 100);
    const totalInterest = annualInterest * tenor / 12;

    return { annualInterest, totalInterest };
}

// cicilan yang harus dibayar setiap bulan
export function calculateMonthlyPayment(
    loanAmount: number,
    tenor: number,
    annualInterestRate: number
) {
    const totalPayment = calculateTotalPayment(
        loanAmount,
        tenor,
        annualInterestRate
    );

    const monthlyPayment = totalPayment / tenor;

    return monthlyPayment;
}

// total keseluruhan hutang yang harus dibayar
export function calculateTotalPayment(
    loanAmount: number,
    tenor: number,
    annualInterestRate: number
) {
    const { totalInterest } = calculateTotalInterest(
        loanAmount,
        tenor,
        annualInterestRate
    );

    const totalPayment = loanAmount + totalInterest;

    return totalPayment;
}

// sisa uang bersih bulanan
export function calculateRemainingCashFlow(
    income: number,
    expense: number,
    monthlyPayment: number
) {
    const monthlyCashFlow = income - expense - monthlyPayment;
    return monthlyCashFlow;
}

// rasio beban utang
export function calculateBurdenRatio(
    monthlyPayment: number,
    income: number
) {
    const burdenRatio = (monthlyPayment / income) * 100;
    return burdenRatio;
}

// status beban keuangan
export function calculateBurdenLevel(
    burdenRatio: number
) {
    if (burdenRatio > 50) {
        return "HIGH";
    } else if (burdenRatio >= 30) {
        return "MODERATE";
    } else {
        return "LOW";
    }
}

// hitung simulasi pengeluaran
export function calculateSimulation(
    income: number,
    expense: number,
    scenario: Scenario
) {
    const loanAmount = calculateLoanAmount(
        scenario.price,
        scenario.dp
    );

    const { totalInterest } = calculateTotalInterest(
        loanAmount,
        scenario.tenor,
        scenario.interest
    );

    const totalPayment = calculateTotalPayment(
        loanAmount,
        scenario.tenor,
        scenario.interest
    );

    const monthlyPayment = calculateMonthlyPayment(
        loanAmount,
        scenario.tenor,
        scenario.interest
    );

    const remainingCashFlow = calculateRemainingCashFlow(
        income,
        expense,
        monthlyPayment
    );

    const burdenRatio = calculateBurdenRatio(
        monthlyPayment,
        income
    );

    const burdenLevel = calculateBurdenLevel(burdenRatio);

    return {
        name: scenario.name,
        loanAmount,
        totalInterest,
        totalPayment,
        monthlyPayment,
        remainingCashFlow,
        burdenRatio,
        burdenLevel,
    };
}