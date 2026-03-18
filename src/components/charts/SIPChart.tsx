'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface SIPChartData {
    month: number;
    invested: number;
    returns: number;
    total: number;
}

interface SIPChartProps {
    monthlyData: Array<{
        month: number;
        invested: number;
        returns: number;
        total: number;
    }>;
}

export const SIPChart: React.FC<SIPChartProps> = ({ monthlyData }) => {
    // Sample every 12 months to avoid cluttered chart
    const sampledData = monthlyData.filter((_, index) => index % 12 === 0);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sampledData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                    formatter={(value) => `₹${(value as number).toLocaleString('en-IN')}`}
                    labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="invested"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    name="Amount Invested"
                />
                <Area
                    type="monotone"
                    dataKey="returns"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    name="Returns"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
