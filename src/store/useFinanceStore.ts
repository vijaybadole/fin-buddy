'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    BuyVsRentInputs,
    BuyVsRentResult,
    SIPInputs,
    SIPResult,
    GoalPlannerInputs,
    GoalPlannerResult,
} from '@/types/finance';
import {
    calculateBuyVsRent,
    calculateSIPDetailed,
    calculateGoalPlanner,
} from '@/lib/finance';

interface FinanceStore {
    // Buy vs Rent
    buyVsRentInputs: BuyVsRentInputs;
    buyVsRentResult: BuyVsRentResult | null;
    setBuyVsRentInputs: (inputs: Partial<BuyVsRentInputs>) => void;
    calculateBuyVsRent: () => void;
    resetBuyVsRent: () => void;

    // SIP Calculator
    sipInputs: SIPInputs;
    sipResult: SIPResult | null;
    setSIPInputs: (inputs: Partial<SIPInputs>) => void;
    calculateSIP: () => void;
    resetSIP: () => void;

    // Goal Planner
    goalPlannerInputs: GoalPlannerInputs;
    goalPlannerResult: GoalPlannerResult | null;
    setGoalPlannerInputs: (inputs: Partial<GoalPlannerInputs>) => void;
    calculateGoalPlanner: () => void;
    resetGoalPlanner: () => void;

    // Theme
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const defaultBuyVsRentInputs: BuyVsRentInputs = {
    propertyPrice: 5000000,
    downPayment: 1000000,
    loanRate: 8.5,
    loanTenure: 20,
    monthlyRent: 30000,
    rentIncreaseRate: 5,
    propertyAppreciationRate: 7,
    investmentReturnRate: 10,
    analysisYears: 20,
};

const defaultSIPInputs: SIPInputs = {
    monthlyInvestment: 10000,
    annualReturnRate: 12,
    investmentMonths: 360,
    inflationRate: 3,
};

const defaultGoalPlannerInputs: GoalPlannerInputs = {
    goalAmount: 1000000,
    monthsRemaining: 60,
    currentSavings: 100000,
    expectedReturnRate: 10,
};

export const useFinanceStore = create<FinanceStore>()(
    persist(
        (set, get) => ({
            // Buy vs Rent
            buyVsRentInputs: defaultBuyVsRentInputs,
            buyVsRentResult: null,
            setBuyVsRentInputs: (inputs) =>
                set((state) => ({
                    buyVsRentInputs: { ...state.buyVsRentInputs, ...inputs },
                })),
            calculateBuyVsRent: () => {
                const { buyVsRentInputs } = get();
                const result = calculateBuyVsRent(buyVsRentInputs);
                set({ buyVsRentResult: result });
            },
            resetBuyVsRent: () =>
                set({
                    buyVsRentInputs: defaultBuyVsRentInputs,
                    buyVsRentResult: null,
                }),

            // SIP Calculator
            sipInputs: defaultSIPInputs,
            sipResult: null,
            setSIPInputs: (inputs) =>
                set((state) => ({
                    sipInputs: { ...state.sipInputs, ...inputs },
                })),
            calculateSIP: () => {
                const { sipInputs } = get();
                const result = calculateSIPDetailed(sipInputs);
                set({ sipResult: result });
            },
            resetSIP: () =>
                set({
                    sipInputs: defaultSIPInputs,
                    sipResult: null,
                }),

            // Goal Planner
            goalPlannerInputs: defaultGoalPlannerInputs,
            goalPlannerResult: null,
            setGoalPlannerInputs: (inputs) =>
                set((state) => ({
                    goalPlannerInputs: { ...state.goalPlannerInputs, ...inputs },
                })),
            calculateGoalPlanner: () => {
                const { goalPlannerInputs } = get();
                const result = calculateGoalPlanner(goalPlannerInputs);
                set({ goalPlannerResult: result });
            },
            resetGoalPlanner: () =>
                set({
                    goalPlannerInputs: defaultGoalPlannerInputs,
                    goalPlannerResult: null,
                }),

            // Theme
            isDarkMode: false,
            toggleDarkMode: () =>
                set((state) => ({
                    isDarkMode: !state.isDarkMode,
                })),
        }),
        {
            name: 'finance-store',
            version: 1,
        }
    )
);
