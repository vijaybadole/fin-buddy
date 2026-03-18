'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SIPForm } from '@/components/forms';
import { SIPChart } from '@/components/charts';
import { Card, CardContent, CardHeader, InsightCard, Button } from '@/components/ui';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function SIPCalculatorPage() {
    const [isClient, setIsClient] = useState(false);
    const { sipInputs, sipResult, setSIPInputs, calculateSIP, resetSIP } = useFinanceStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    const handleFormSubmit = (data: typeof sipInputs) => {
        setSIPInputs(data);
        calculateSIP();
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
                    SIP Calculator 📈
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Plan your Systematic Investment Plan and see how your wealth grows over time.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Form */}
                    <div className="lg:col-span-1">
                        <SIPForm onSubmit={handleFormSubmit} onReset={resetSIP} initialValues={sipInputs} />
                    </div>

                    {/* Right: Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {sipResult ? (
                            <>
                                {/* Chart */}
                                <Card>
                                    <CardHeader>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Investment Growth Over Time
                                        </h2>
                                    </CardHeader>
                                    <CardContent>
                                        <SIPChart monthlyData={sipResult.monthlyData} />
                                    </CardContent>
                                </Card>

                                {/* Summary Insights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InsightCard
                                        type="success"
                                        title="Future Value"
                                        value={formatCurrency(sipResult.futureValue)}
                                        icon="💰"
                                    />
                                    <InsightCard
                                        type="info"
                                        title="Wealth Gained"
                                        value={formatCurrency(sipResult.wealthGained)}
                                        icon="📊"
                                    />
                                </div>

                                {/* Additional Insights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InsightCard
                                        type="info"
                                        title="Total Invested"
                                        value={formatCurrency(sipResult.totalInvested)}
                                        description={`Monthly: ${formatCurrency(sipInputs.monthlyInvestment)}`}
                                    />
                                    <InsightCard
                                        type="warning"
                                        title="Inflation-Adjusted Value"
                                        value={formatCurrency(sipResult.inflationAdjustedValue)}
                                        description={`At ${sipInputs.inflationRate || 3}% inflation`}
                                    />
                                </div>

                                {/* Detailed Breakdown */}
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Investment Summary
                                        </h3>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                    Return %
                                                </p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {(
                                                        ((sipResult.futureValue - sipResult.totalInvested) /
                                                            sipResult.totalInvested) *
                                                        100
                                                    ).toFixed(1)}
                                                    %
                                                </p>
                                            </div>
                                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                    Investment Period
                                                </p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {(sipInputs.investmentMonths / 12).toFixed(1)} yrs
                                                </p>
                                            </div>
                                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                    Annual Return
                                                </p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {sipInputs.annualReturnRate}%
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Fill out the form on the left to see your SIP projections
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Adjust the monthly investment and return rate to see different scenarios
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
