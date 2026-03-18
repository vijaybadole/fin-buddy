'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader } from '@/components/ui';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { isDarkMode, toggleDarkMode } = useFinanceStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const features = [
    {
      title: 'Buy vs Rent Analysis',
      description: 'Compare buying and renting scenarios with detailed financial projections.',
      link: '/buy-vs-rent',
      icon: '🏠',
    },
    {
      title: 'SIP Calculator',
      description: 'Calculate your investment returns with Systematic Investment Plan.',
      link: '/sip-calculator',
      icon: '📈',
    },
    {
      title: 'Goal-Based Planner',
      description: 'Plan your investments to achieve your financial goals.',
      link: '/goal-planner',
      icon: '🎯',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">💰</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fin Buddy</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:opacity-80 transition-opacity"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Make Smarter Financial Decisions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Personal Finance Decision Platform helps you analyze investment options, plan your SIPs, and make data-driven financial choices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <Link key={feature.link} href={feature.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="text-5xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mb-16">
          <Link href="/buy-vs-rent">
            <Button size="lg" variant="primary" className="mr-4">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features List */}
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Live Charts</h4>
                  <p className="text-gray-600 dark:text-gray-400">Visualize your financial projections in real-time</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Calculations</h4>
                  <p className="text-gray-600 dark:text-gray-400">Accurate financial modeling with monthly compounding</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h4>
                  <p className="text-gray-600 dark:text-gray-400">Comfortable viewing in any lighting condition</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Data Persistence</h4>
                  <p className="text-gray-600 dark:text-gray-400">Your calculations are saved locally</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Fin Buddy. Make informed financial decisions.</p>
        </div>
      </footer>
    </div>
  );
}
