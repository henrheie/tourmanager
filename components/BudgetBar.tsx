'use client';
import { TOTAL_BUDGET } from '@/lib/constants';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface BudgetBarProps {
  spent: number;
}

export const BudgetBar: FC<BudgetBarProps> = ({ spent }) => {
  const remaining = TOTAL_BUDGET - spent;
  const over = remaining < 0;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-10 w-full bg-white dark:bg-gray-800 p-2 shadow"
    >
      <div className="h-4 bg-gray-200 rounded">
        <div
          className={`h-4 rounded ${over ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${(spent / TOTAL_BUDGET) * 100}%` }}
          aria-label="Budget used"
        />
      </div>
      <p className="text-sm mt-1" aria-live="polite">
        {remaining.toFixed(1)} mill. NOK igjen
      </p>
    </motion.div>
  );
};
