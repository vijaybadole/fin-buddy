'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card, CardContent, CardHeader } from '@/components/ui';
import type { GoalPlannerInputs } from '@/types/finance';

const goalPlannerSchema = z.object({
    goalAmount: z.number().min(10000, 'Goal amount must be at least ₹10,000'),
    monthsRemaining: z.number().min(1, 'Timeline must be at least 1 month').max(600, 'Timeline too long'),
    currentSavings: z.number().min(0, 'Current savings must be positive'),
    expectedReturnRate: z.number().min(0, 'Return rate must be positive').max(50, 'Rate too high'),
});

interface GoalPlannerFormProps {
    onSubmit: (data: GoalPlannerInputs) => void;
    onReset: () => void;
    isLoading?: boolean;
    initialValues?: Partial<GoalPlannerInputs>;
}

export const GoalPlannerForm: React.FC<GoalPlannerFormProps> = ({
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
    } = useForm<GoalPlannerInputs>({
        resolver: zodResolver(goalPlannerSchema),
        defaultValues: initialValues,
    });

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Goal-Based Planner</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Calculate the required investment to reach your financial goal
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Goal Amount (₹)"
                            type="number"
                            {...register('goalAmount', { valueAsNumber: true })}
                            error={errors.goalAmount?.message}
                            placeholder="10,00,000"
                        />
                        <Input
                            label="Timeline (Months)"
                            type="number"
                            {...register('monthsRemaining', { valueAsNumber: true })}
                            error={errors.monthsRemaining?.message}
                            placeholder="60"
                            helpText="5 years = 60 months"
                        />
                        <Input
                            label="Current Savings (₹)"
                            type="number"
                            {...register('currentSavings', { valueAsNumber: true })}
                            error={errors.currentSavings?.message}
                            placeholder="1,00,000"
                        />
                        <Input
                            label="Expected Return Rate (%/year)"
                            type="number"
                            step="0.1"
                            {...register('expectedReturnRate', { valueAsNumber: true })}
                            error={errors.expectedReturnRate?.message}
                            placeholder="10"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
                            Calculate Required SIP
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
