import type { GoalPlannerInputs, GoalPlannerResult } from '@/types/finance';
import { calculateSIPFutureValue } from './sip';

export function calculateGoalPlanner(inputs: GoalPlannerInputs): GoalPlannerResult {
    const { goalAmount, monthsRemaining, currentSavings, expectedReturnRate } = inputs;

    const monthlyRate = expectedReturnRate / 100 / 12;

    // Future value of current savings
    const currentSavingsGrowth = currentSavings * Math.pow(1 + monthlyRate, monthsRemaining);

    // Total amount needed from SIP
    const totalRequired = goalAmount - currentSavingsGrowth;

    // Calculate required monthly SIP
    let requiredSIP = 0;
    if (totalRequired > 0) {
        if (monthlyRate === 0) {
            requiredSIP = totalRequired / monthsRemaining;
        } else {
            requiredSIP = totalRequired /
                (((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate) * (1 + monthlyRate));
        }
    }

    // Calculate actual achievable amount with calculated SIP
    const achievedAmount = currentSavingsGrowth + calculateSIPFutureValue(requiredSIP, expectedReturnRate, monthsRemaining);

    const isFeasible = achievedAmount >= goalAmount && requiredSIP >= 0;

    const gapCovered = achievedAmount - currentSavingsGrowth;

    let message = '';
    if (isFeasible) {
        message = `Invest ₹${Math.ceil(requiredSIP).toLocaleString('en-IN')} monthly to achieve your goal of ₹${Math.ceil(goalAmount).toLocaleString('en-IN')} in ${monthsRemaining} months.`;
    } else {
        message = `To achieve ₹${Math.ceil(goalAmount).toLocaleString('en-IN')}, you would need to invest ₹${Math.ceil(Math.abs(requiredSIP)).toLocaleString('en-IN')} monthly. Consider extending your timeline or increasing returns.`;
    }

    return {
        requiredSIP: Math.max(0, Math.ceil(requiredSIP * 100) / 100),
        isFeasible,
        achievedAmount: Math.round(achievedAmount * 100) / 100,
        message,
        breakdown: {
            currentSavingsGrowth: Math.round(currentSavingsGrowth * 100) / 100,
            totalRequired: Math.round(Math.max(0, totalRequired) * 100) / 100,
            gapCovered: Math.round(gapCovered * 100) / 100,
        },
    };
}
