/**
 * Calculate EMI (Equated Monthly Installment)
 * Formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
 * where P = principal, r = monthly rate, n = number of months
 */
export function calculateEMI(principal: number, annualRate: number, months: number): number {
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / months;

    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    return numerator / denominator;
}

/**
 * Calculate remaining loan amount after N months
 */
export function calculateRemainingLoan(
    principal: number,
    annualRate: number,
    months: number,
    monthsPassed: number
): number {
    const monthlyRate = annualRate / 100 / 12;
    const emi = calculateEMI(principal, annualRate, months);

    const balance = principal * Math.pow(1 + monthlyRate, monthsPassed) -
        (emi / monthlyRate) * (Math.pow(1 + monthlyRate, monthsPassed) - 1);

    return Math.max(0, balance);
}

/**
 * Calculate total interest paid over loan tenure
 */
export function calculateTotalInterest(
    principal: number,
    annualRate: number,
    months: number
): number {
    const emi = calculateEMI(principal, annualRate, months);
    return emi * months - principal;
}
