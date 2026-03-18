import type { SIPInputs, SIPResult } from '@/types/finance';

/**
 * Calculate future value of SIP
 * Formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
 * where P = monthly investment, r = monthly rate, n = number of months
 */
export function calculateSIPFutureValue(
    monthlyInvestment: number,
    annualReturnRate: number,
    months: number
): number {
    const monthlyRate = annualReturnRate / 100 / 12;

    if (monthlyRate === 0) {
        return monthlyInvestment * months;
    }

    const futureValue =
        monthlyInvestment *
        (Math.pow(1 + monthlyRate, months) - 1) /
        monthlyRate *
        (1 + monthlyRate);

    return futureValue;
}

/**
 * Calculate SIP with monthly tracking
 */
export function calculateSIPDetailed(inputs: SIPInputs): SIPResult {
    const { monthlyInvestment, annualReturnRate, investmentMonths, inflationRate = 3 } = inputs;
    const monthlyRate = annualReturnRate / 100 / 12;
    const monthlyInflationRate = inflationRate / 100 / 12;

    let totalInvested = 0;
    let totalValue = 0;
    const monthlyData = [];

    for (let month = 1; month <= investmentMonths; month++) {
        const previousValue = totalValue * (1 + monthlyRate);
        totalValue = previousValue + monthlyInvestment;
        totalInvested += monthlyInvestment;

        monthlyData.push({
            month,
            invested: totalInvested,
            returns: totalValue - totalInvested,
            total: totalValue,
        });
    }

    const futureValue = totalValue;
    const wealthGained = futureValue - totalInvested;

    // Calculate inflation-adjusted value
    const inflationAdjustedValue = futureValue / Math.pow(1 + monthlyInflationRate, investmentMonths);

    return {
        futureValue: Math.round(futureValue * 100) / 100,
        totalInvested: Math.round(totalInvested * 100) / 100,
        wealthGained: Math.round(wealthGained * 100) / 100,
        inflationAdjustedValue: Math.round(inflationAdjustedValue * 100) / 100,
        monthlyData: monthlyData.map(m => ({
            ...m,
            invested: Math.round(m.invested * 100) / 100,
            returns: Math.round(m.returns * 100) / 100,
            total: Math.round(m.total * 100) / 100,
        })),
    };
}

/**
 * Calculate required monthly SIP to reach a goal
 */
export function calculateRequiredSIP(
    goalAmount: number,
    annualReturnRate: number,
    months: number
): number {
    const monthlyRate = annualReturnRate / 100 / 12;

    if (monthlyRate === 0) {
        return goalAmount / months;
    }

    const requiredSIP = goalAmount /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    return Math.ceil(requiredSIP * 100) / 100;
}
