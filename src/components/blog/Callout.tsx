"use client";

import { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

type CalloutVisual = 'info' | 'success' | 'warn' | 'danger';

interface CalloutProps {
  type?: CalloutVisual; // 'warning' kept only for backwards compat
  title?: string;
  icon?: string;
}

const styles: Record<Exclude<CalloutVisual, 'warning'>, string> = {
  info: 'border-sky-500/60 bg-sky-500/7 text-sky-400',
  success: 'border-emerald-500/60 bg-emerald-500/7 text-emerald-400',
  warn: 'border-amber-500/60 bg-amber-500/7 text-amber-400',
  danger: 'border-rose-500/60 bg-rose-500/7 text-rose-400'
};

export default function Callout({ children, type = 'info', title, icon }: PropsWithChildren<CalloutProps>) {

  return (
    <div
      className={cn(
        'my-6 flex w-full items-start gap-3 rounded-md border px-4 py-3 text-sm leading-relaxed backdrop-blur-sm shadow-sm',
        styles[type] ?? styles.info
      )}
    >
      {icon && (
        <span className="select-none text-xl leading-none pt-0.5" aria-hidden>
          {icon}
        </span>
      )}
      <div className="flex-1 space-y-1 text-base text-foreground/90 dark:text-white/80">
        {title && (
          <div className="font-semibold uppercase tracking-wide text-[0.65rem] sm:text-[0.7rem] opacity-90">
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