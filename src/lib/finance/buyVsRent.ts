import type { BuyVsRentInputs, BuyVsRentResult } from '@/types/finance';
import { calculateEMI } from './emi';

export function calculateBuyVsRent(inputs: BuyVsRentInputs): BuyVsRentResult {
    const {
        propertyPrice,
        downPayment,
        loanRate,
        loanTenure,
        monthlyRent,
        rentIncreaseRate,
        propertyAppreciationRate,
        investmentReturnRate,
        analysisYears,
    } = inputs;

    const totalMonths = analysisYears * 12;
    const loanAmount = propertyPrice - downPayment;
    const emi = calculateEMI(loanAmount, loanRate, loanTenure * 12);

    const propertyValues: number[] = [];
    const rentCosts: number[] = [];
    const emiPayments: number[] = [];
    const investmentGrowth: number[] = [];

    let propertyValue = propertyPrice;
    let cumulativeRent = 0;
    let cumulativeEMI = 0;
    let investmentValue = 0;

    const monthlyPropertyAppreciationRate = propertyAppreciationRate / 100 / 12;
    const monthlyRentIncreaseRate = rentIncreaseRate / 100 / 12;
    const monthlyInvestmentReturnRate = investmentReturnRate / 100 / 12;

    let currentRent = monthlyRent;

    for (let month = 1; month <= totalMonths; month++) {
        // Property appreciation (only buying scenario)
        propertyValue = propertyValue * (1 + monthlyPropertyAppreciationRate);
        propertyValues.push(Math.round(propertyValue));

        // Rent increase (only renting scenario)
        currentRent = currentRent * (1 + monthlyRentIncreaseRate);
        cumulativeRent += currentRent;
        rentCosts.push(Math.round(cumulativeRent));

        // EMI calculations (buying scenario)
        const monthlyEMI = month <= loanTenure * 12 ? emi : 0;
        cumulativeEMI += monthlyEMI;
        emiPayments.push(Math.round(cumulativeEMI));

        // Investment growth (rent scenario: difference between EMI and rent is invested)
        const monthlyDifference = Math.max(0, monthlyEMI - currentRent);
        investmentValue = investmentValue * (1 + monthlyInvestmentReturnRate) + monthlyDifference;
        investmentGrowth.push(Math.round(investmentValue));
    }

    // Calculate net worth for buying
    const netWorthBuy = propertyValue - cumulativeEMI;

    // Calculate net worth for renting + investing
    const netWorthRent = investmentValue;

    const difference = netWorthBuy - netWorthRent;
    const recommendation = difference > 0 ? 'buy' : 'rent';

    return {
        scenario: recommendation,
        propertyValues,
        rentCosts,
        emiPayments,
        investmentGrowth,
        netWorthBuy: Math.round(netWorthBuy * 100) / 100,
        netWorthRent: Math.round(netWorthRent * 100) / 100,
        difference: Math.round(difference * 100) / 100,
        recommendation,
    };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
    return `${value.toFixed(2)}%`;
}
