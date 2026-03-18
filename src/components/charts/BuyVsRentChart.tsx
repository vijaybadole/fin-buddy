'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface BuyVsRentChartData {
    month: number;
    propertyValue: number;
    investmentGrowth: number;
}

interface BuyVsRentChartProps {
    propertyValues: number[];
    investmentGrowth: number[];
}

export const BuyVsRentComparisonChart: React.FC<BuyVsRentChartProps> = ({
    propertyValues,
    investmentGrowth,
}) => {
    const data: BuyVsRentChartData[] = propertyValues.map((value, index) => ({
        month: index + 1,
        propertyValue: value,
        investmentGrowth: investmentGrowth[index] || 0,
    }));

    // Sample every 12 months to avoid cluttered chart
    const sampledData = data.filter((_, index) => index % 12 === 0);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampledData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis label={{ value: 'Value (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                    formatter={(value) => `₹${(value as number).toLocaleString('en-IN')}`}
                    labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="propertyValue"
                    stroke="#3b82f6"
                    dot={false}
                    name="Property Value (Buy)"
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="investmentGrowth"
                    stroke="#10b981"
                    dot={false}
                    name="Investment Growth (Rent)"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
