export function calculateLoanAmount(price: number, dp: number): number {
    return price - dp
}

export function calculateTotalInterest(
    loanAmount: number,
    tenor: number,
    annualInterestRate: number
) {
    const annualInterest = loanAmount * (annualInterestRate / 100);
    const totalInterest = annualInterest * tenor / 12;

    return { annualInterest, totalInterest }
}

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

export function calculateRemainingCashFlow(
    income: number,
    expense: number,
    monthlyPayment: number
) {
    const monthlyCashFlow = income - expense - monthlyPayment
    return monthlyCashFlow;
}

export function calculateBurdenRatio(
    monthlyPayment: number,
    income: number
) {
    const burdenRatio = (monthlyPayment / income) * 100;
    return burdenRatio;
}

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
