"use client";

import { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

type CalloutVisual = 'info' | 'success' | 'warn' | 'danger';

interface CalloutProps {
  type?: CalloutVisual; // 'warning' kept only for backwards compat
  title?: string;
  icon?: string;
}

// Revised styling: neutral background + accent bar for contrast in light mode.
// Avoid low-contrast pastel-on-pale; body text always uses standard foreground.
const styles: Record<Exclude<CalloutVisual, 'warning'>, string> = {
  info: 'border-sky-400/50 before:bg-sky-500',
  success: 'border-emerald-400/50 before:bg-emerald-500',
  warn: 'border-amber-400/60 before:bg-amber-500',
  danger: 'border-rose-400/60 before:bg-rose-500'
};

const accentText: Record<Exclude<CalloutVisual, 'warning'>, string> = {
  info: 'text-sky-600 dark:text-sky-300',
  success: 'text-emerald-600 dark:text-emerald-300',
  warn: 'text-amber-600 dark:text-amber-300',
  danger: 'text-rose-600 dark:text-rose-300'
};

export default function Callout({ children, type = 'info', title, icon }: PropsWithChildren<CalloutProps>) {

  return (
    <div
      className={cn(
        'relative my-6 flex w-full items-start gap-3 rounded-md border px-5 py-4 text-sm leading-relaxed shadow-sm bg-muted/60 dark:bg-muted/30 text-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-md',
        styles[type] ?? styles.info
      )}
    >
      {icon && (
        <span className={cn('select-none text-xl leading-none pt-0.5', accentText[type] ?? accentText.info)} aria-hidden>
          {icon}
        </span>
      )}
      <div className="flex-1 space-y-1 text-base">
        {title && (
          <div className={cn(
            'font-semibold uppercase tracking-wide text-[0.65rem] sm:text-[0.7rem]',
            accentText[type] ?? accentText.info
          )}>
            {title}
          </div>
        )}
        <div className="[&_p:first-child]:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}