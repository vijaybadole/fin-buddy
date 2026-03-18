'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BuyVsRentForm } from '@/components/forms';
import { BuyVsRentComparisonChart } from '@/components/charts';
import { Card, CardContent, CardHeader, InsightCard, Button } from '@/components/ui';
import { useFinanceStore } from '@/store/useFinanceStore';
import { formatCurrency, formatPercentage } from '@/lib/finance/buyVsRent';

export default function BuyVsRentPage() {
    const [isClient, setIsClient] = useState(false);
    const {
        buyVsRentInputs,
        buyVsRentResult,
        setBuyVsRentInputs,
        calculateBuyVsRent,
        resetBuyVsRent,
    } = useFinanceStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    const handleFormSubmit = (data: typeof buyVsRentInputs) => {
        setBuyVsRentInputs(data);
        calculateBuyVsRent();
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
                    Buy vs Rent Analysis 🏠
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Compare buying and renting scenarios to make the best decision for your situation.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Form */}
                    <div className="lg:col-span-1">
                        <BuyVsRentForm
                            onSubmit={handleFormSubmit}
                            onReset={resetBuyVsRent}
                            initialValues={buyVsRentInputs}
                        />
                    </div>

                    {/* Right: Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {buyVsRentResult ? (
                            <>
                                {/* Chart */}
                                <Card>
                                    <CardHeader>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Property Value vs Investment Growth
                                        </h2>
                                    </CardHeader>
                                    <CardContent>
                                        <BuyVsRentComparisonChart
                                            propertyValues={buyVsRentResult.propertyValues}
                                            investmentGrowth={buyVsRentResult.investmentGrowth}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Summary Insights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InsightCard
                                        type={buyVsRentResult.recommendation === 'buy' ? 'success' : 'info'}
                                        title="Net Worth - Buying"
                                        value={formatCurrency(buyVsRentResult.netWorthBuy)}
                                        icon="🏠"
                                    />
                                    <InsightCard
                                        type={buyVsRentResult.recommendation === 'rent' ? 'success' : 'info'}
                                        title="Net Worth - Renting"
                                        value={formatCurrency(buyVsRentResult.netWorthRent)}
                                        icon="🏘️"
                                    />
                                </div>

                                {/* Recommendation */}
                                <InsightCard
                                    type={buyVsRentResult.recommendation === 'buy' ? 'success' : 'warning'}
                                    title="📊 Recommendation"
                                    value={buyVsRentResult.recommendation === 'buy' ? 'BUY' : 'RENT'}
                                    description={`The difference in net worth is ${formatCurrency(
                                        Math.abs(buyVsRentResult.difference)
                                    )} in favor of ${buyVsRentResult.recommendation === 'buy' ? 'buying' : 'renting'
                                        }.`}
                                />

                                {/* Detailed Breakdown */}
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Detailed Breakdown
                                        </h3>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Total EMI Paid
                                                </p>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {formatCurrency(
                                                        buyVsRentResult.emiPayments[buyVsRentResult.emiPayments.length - 1]
                                                    )}
                                                </p>
                                            </div>
                                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Total Rent Paid
                                                </p>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {formatCurrency(
                                                        buyVsRentResult.rentCosts[buyVsRentResult.rentCosts.length - 1]
                                                    )}
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
                                        Fill out the form on the left to see your analysis
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Adjust the parameters to compare different scenarios
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
