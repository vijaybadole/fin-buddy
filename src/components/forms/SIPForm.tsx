'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card, CardContent, CardHeader } from '@/components/ui';
import type { SIPInputs } from '@/types/finance';

const sipSchema = z.object({
    monthlyInvestment: z.number().min(100, 'Monthly investment must be at least ₹100'),
    annualReturnRate: z.number().min(0, 'Return rate must be positive').max(50, 'Rate too high'),
    investmentMonths: z.number().min(1, 'Investment period must be at least 1 month').max(600, 'Period too long'),
    inflationRate: z.number().min(0, 'Inflation rate must be positive').max(20, 'Rate too high').optional(),
});

interface SIPFormProps {
    onSubmit: (data: SIPInputs) => void;
    onReset: () => void;
    isLoading?: boolean;
    initialValues?: Partial<SIPInputs>;
}

export const SIPForm: React.FC<SIPFormProps> = ({
    onSubmit,
    onReset,
    isLoading = false,
    initialValues,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SIPInputs>({
        resolver: zodResolver(sipSchema),
        defaultValues: initialValues,
    });

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">SIP Calculator</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Calculate your investment returns with Systematic Investment Plan
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Monthly Investment (₹)"
                            type="number"
                            {...register('monthlyInvestment', { valueAsNumber: true })}
                            error={errors.monthlyInvestment?.message}
                            placeholder="10,000"
                        />
                        <Input
                            label="Annual Return Rate (%)"
                            type="number"
                            step="0.1"
                            {...register('annualReturnRate', { valueAsNumber: true })}
                            error={errors.annualReturnRate?.message}
                            placeholder="12"
                        />
                        <Input
                            label="Investment Period (Months)"
                            type="number"
                            {...register('investmentMonths', { valueAsNumber: true })}
                            error={errors.investmentMonths?.message}
                            placeholder="360"
                            helpText="30 years = 360 months"
                        />
                        <Input
                            label="Inflation Rate (%) - Optional"
                            type="number"
                            step="0.1"
                            {...register('inflationRate', { valueAsNumber: true })}
                            error={errors.inflationRate?.message}
                            placeholder="3"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                            Calculate SIP
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                reset();
                                onReset();
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
