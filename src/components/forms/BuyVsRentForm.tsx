'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card, CardContent, CardHeader } from '@/components/ui';
import type { BuyVsRentInputs } from '@/types/finance';

const buyVsRentSchema = z.object({
    propertyPrice: z.number().min(100000, 'Property price must be at least 1 lakh'),
    downPayment: z.number().min(0, 'Down payment must be positive'),
    loanRate: z.number().min(0, 'Loan rate must be positive').max(25, 'Loan rate too high'),
    loanTenure: z.number().min(1, 'Tenure must be at least 1 year').max(40, 'Tenure too long'),
    monthlyRent: z.number().min(0, 'Monthly rent must be positive'),
    rentIncreaseRate: z.number().min(0, 'Rent increase rate must be positive').max(20, 'Rate too high'),
    propertyAppreciationRate: z.number().min(0, 'Appreciation must be positive').max(20, 'Rate too high'),
    investmentReturnRate: z.number().min(0, 'Return rate must be positive').max(30, 'Rate too high'),
    analysisYears: z.number().min(1, 'Analysis period must be at least 1 year').max(50, 'Period too long'),
});

interface BuyVsRentFormProps {
    onSubmit: (data: BuyVsRentInputs) => void;
    onReset: () => void;
    isLoading?: boolean;
    initialValues?: Partial<BuyVsRentInputs>;
}

export const BuyVsRentForm: React.FC<BuyVsRentFormProps> = ({
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
    } = useForm<BuyVsRentInputs>({
        resolver: zodResolver(buyVsRentSchema),
        defaultValues: initialValues,
    });

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Buy vs Rent Analysis</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Enter your details to compare buying and renting scenarios
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Property Price (₹)"
                            type="number"
                            {...register('propertyPrice', { valueAsNumber: true })}
                            error={errors.propertyPrice?.message}
                            placeholder="50,00,000"
                        />
                        <Input
                            label="Down Payment (₹)"
                            type="number"
                            {...register('downPayment', { valueAsNumber: true })}
                            error={errors.downPayment?.message}
                            placeholder="10,00,000"
                        />
                        <Input
                            label="Loan Interest Rate (%)"
                            type="number"
                            step="0.1"
                            {...register('loanRate', { valueAsNumber: true })}
                            error={errors.loanRate?.message}
                            placeholder="8.5"
                        />
                        <Input
                            label="Loan Tenure (Years)"
                            type="number"
                            {...register('loanTenure', { valueAsNumber: true })}
                            error={errors.loanTenure?.message}
                            placeholder="20"
                        />
                        <Input
                            label="Monthly Rent (₹)"
                            type="number"
                            {...register('monthlyRent', { valueAsNumber: true })}
                            error={errors.monthlyRent?.message}
                            placeholder="30,000"
                        />
                        <Input
                            label="Rent Increase Rate (%/year)"
                            type="number"
                            step="0.1"
                            {...register('rentIncreaseRate', { valueAsNumber: true })}
                            error={errors.rentIncreaseRate?.message}
                            placeholder="5"
                        />
                        <Input
                            label="Property Appreciation Rate (%/year)"
                            type="number"
                            step="0.1"
                            {...register('propertyAppreciationRate', { valueAsNumber: true })}
                            error={errors.propertyAppreciationRate?.message}
                            placeholder="7"
                        />
                        <Input
                            label="Investment Return Rate (%/year)"
                            type="number"
                            step="0.1"
                            {...register('investmentReturnRate', { valueAsNumber: true })}
                            error={errors.investmentReturnRate?.message}
                            placeholder="10"
                        />
                        <Input
                            label="Analysis Period (Years)"
                            type="number"
                            {...register('analysisYears', { valueAsNumber: true })}
                            error={errors.analysisYears?.message}
                            placeholder="20"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                            Calculate Comparison
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
