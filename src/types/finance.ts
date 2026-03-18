export interface BuyVsRentInputs {
    propertyPrice: number;
    downPayment: number;
    loanRate: number;
    loanTenure: number;
    monthlyRent: number;
    rentIncreaseRate: number;
    propertyAppreciationRate: number;
    investmentReturnRate: number;
    analysisYears: number;
}

export interface BuyVsRentResult {
    scenario: 'buy' | 'rent';
    propertyValues: number[];
    rentCosts: number[];
    emiPayments: number[];
    investmentGrowth: number[];
    netWorthBuy: number;
    netWorthRent: number;
    difference: number;
    recommendation: 'buy' | 'rent';
}

export interface SIPInputs {
    monthlyInvestment: number;
    annualReturnRate: number;
    investmentMonths: number;
    inflationRate?: number;
}

export interface SIPResult {
    futureValue: number;
    totalInvested: number;
    wealthGained: number;
    inflationAdjustedValue: number;
    monthlyData: Array<{
        month: number;
        invested: number;
        returns: number;
        total: number;
    }>;
}

export interface GoalPlannerInputs {
    goalAmount: number;
    monthsRemaining: number;
    currentSavings: number;
    expectedReturnRate: number;
}

export interface GoalPlannerResult {
    requiredSIP: number;
    isFeasible: boolean;
    achievedAmount: number;
    message: string;
    breakdown: {
        currentSavingsGrowth: number;
        totalRequired: number;
        gapCovered: number;
    };
}
