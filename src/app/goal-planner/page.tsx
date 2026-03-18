'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoalPlannerForm } from '@/components/forms';
import { Card, CardContent, CardHeader, InsightCard, Button } from '@/components/ui';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function GoalPlannerPage() {
    const [isClient, setIsClient] = useState(false);
    const {
        goalPlannerInputs,
        goalPlannerResult,
        setGoalPlannerInputs,
        calculateGoalPlanner,
        resetGoalPlanner,
    } = useFinanceStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    const handleFormSubmit = (data: typeof goalPlannerInputs) => {
        setGoalPlannerInputs(data);
        calculateGoalPlanner();
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/">
                        <Button variant="secondary" size="sm">
                            ← Back to Home
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Goal-Based Investment Planner 🎯
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Calculate the monthly SIP needed to reach your financial goals.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Form */}
                    <div className="lg:col-span-1">
                        <GoalPlannerForm
                            onSubmit={handleFormSubmit}
                            onReset={resetGoalPlanner}
                            initialValues={goalPlannerInputs}
                        />
                    </div>

                    {/* Right: Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {goalPlannerResult ? (
                            <>
                                {/* Main Recommendation */}
                                <InsightCard
                                    type={goalPlannerResult.isFeasible ? 'success' : 'warning'}
                                    title="Required Monthly Investment"
                                    value={formatCurrency(goalPlannerResult.requiredSIP)}
                                    icon={goalPlannerResult.isFeasible ? '✅' : '⚠️'}
                                />

                                {/* Feasibility */}
                                <Card>
                                    <CardHeader>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Feasibility Assessment
                                        </h2>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">
                                                {goalPlannerResult.isFeasible ? '✅' : '❌'}
                                            </span>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    {goalPlannerResult.isFeasible ? 'Feasible' : 'Not Currently Feasible'}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {goalPlannerResult.message}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InsightCard
                                        type="info"
                                        title="Your Goal"
                                        value={formatCurrency(goalPlannerInputs.goalAmount)}
                                        icon="🎯"
                                    />
                                    <InsightCard
                                        type="success"
                                        title="Achievable Amount"
                                        value={formatCurrency(goalPlannerResult.achievedAmount)}
                                        description={`With ₹${Math.ceil(goalPlannerResult.requiredSIP).toLocaleString('en-IN')} monthly`}
                                    />
                                </div>

                                {/* Detailed Breakdown */}
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Investment Breakdown
                                        </h3>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    Current Savings Growth
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {formatCurrency(goalPlannerResult.breakdown.currentSavingsGrowth)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    SIP Growth Required
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {formatCurrency(goalPlannerResult.breakdown.gapCovered)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                                    Total Coverage
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-white text-lg">
                                                    {formatCurrency(goalPlannerResult.achievedAmount)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Coverage Percentage */}
                                        <div className="mt-4">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Goal Coverage
                                                </span>
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                    {(
                                                        Math.min(
                                                            100,
                                                            (goalPlannerResult.achievedAmount / goalPlannerInputs.goalAmount) *
                                                            100
                                                        )
                                                    ).toFixed(1)}
                                                    %
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${goalPlannerResult.isFeasible ? 'bg-green-500' : 'bg-yellow-500'
                                                        }`}
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            (goalPlannerResult.achievedAmount / goalPlannerInputs.goalAmount) *
                                                            100
                                                        )}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Timeline Info */}
                                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timeline</p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {Math.ceil(goalPlannerInputs.monthsRemaining / 12)} years ({
                                                    goalPlannerInputs.monthsRemaining
                                                } months)
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Fill out the form on the left to calculate your required SIP
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Enter your goal amount, timeline, and expected return rate
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
