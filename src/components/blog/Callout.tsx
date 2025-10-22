"use client";

import { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

type CalloutVisual = 'info' | 'success' | 'warn' | 'danger' | 'tldr';

interface CalloutProps {
  type?: CalloutVisual;
  title?: string;
  icon?: string;
}

// Enhanced styling with gradients and better contrast
const styles: Record<CalloutVisual, string> = {
  info: 'border-sky-400/50 bg-gradient-to-br from-sky-50/50 to-sky-100/30 dark:from-sky-950/30 dark:to-sky-900/20 before:bg-gradient-to-b before:from-sky-400 before:to-sky-600',
  success: 'border-emerald-400/50 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-900/20 before:bg-gradient-to-b before:from-emerald-400 before:to-emerald-600',
  warn: 'border-amber-400/60 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 before:bg-gradient-to-b before:from-amber-400 before:to-amber-600',
  danger: 'border-rose-400/60 bg-gradient-to-br from-rose-50/50 to-rose-100/30 dark:from-rose-950/30 dark:to-rose-900/20 before:bg-gradient-to-b before:from-rose-400 before:to-rose-600',
  tldr: 'border-purple-400/50 bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-950/30 dark:to-purple-900/20 before:bg-gradient-to-b before:from-purple-400 before:to-purple-600'
};

const accentText: Record<CalloutVisual, string> = {
  info: 'text-sky-700 dark:text-sky-300',
  success: 'text-emerald-700 dark:text-emerald-300',
  warn: 'text-amber-700 dark:text-amber-300',
  danger: 'text-rose-700 dark:text-rose-300',
  tldr: 'text-purple-700 dark:text-purple-300'
};

const iconMap: Record<CalloutVisual, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warn: AlertTriangle,
  danger: XCircle,
  tldr: Info
};

export default function Callout({ children, type = 'info', title, icon }: PropsWithChildren<CalloutProps>) {
  const IconComponent = iconMap[type];

  return (
    <div
      className={cn(
        'relative my-8 flex w-full items-start gap-4 rounded-lg border-2 px-6 py-5 text-sm leading-relaxed shadow-md backdrop-blur-sm text-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-lg transition-all hover:shadow-lg',
        styles[type] ?? styles.info
      )}
    >
      <div className={cn(
        'flex-shrink-0 p-2 rounded-full bg-white/50 dark:bg-black/20',
        accentText[type] ?? accentText.info
      )}>
        {icon ? (
          <span className="select-none text-xl leading-none flex items-center justify-center" aria-hidden>
            {icon}
          </span>
        ) : (
          <IconComponent className="w-5 h-5" />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        {title && (
          <div className={cn(
            'font-bold text-sm tracking-wide',
            accentText[type] ?? accentText.info
          )}>
            {title}
          </div>
        )}
        <div className="text-foreground/90 dark:text-foreground/80 [&_p]:leading-relaxed [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}