"use client";
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm',
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('p-4', className)} {...props} />
  );
}
