"use client";

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className: '',
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
          border: '2px solid hsl(var(--border))',
          fontSize: '15px',
          padding: '20px 24px',
          borderRadius: '20px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px hsl(var(--border) / 0.3)',
          maxWidth: '480px',
          minWidth: '320px',
          fontWeight: '600',
          letterSpacing: '0.02em',
          lineHeight: '1.5',
        },
        success: {
          iconTheme: {
            primary: 'hsl(var(--primary))',
            secondary: 'hsl(var(--background))',
          },
          style: {
            border: '2px solid hsl(var(--primary))',
            background: 'hsl(var(--primary) / 0.2)',
            backdropFilter: 'blur(16px)',
            fontWeight: '600',
            boxShadow: '0 12px 40px hsl(var(--primary) / 0.4), 0 0 0 1px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.2)',
          }
        },
        error: {
          iconTheme: {
            primary: 'hsl(var(--destructive))',
            secondary: 'hsl(var(--background))',
          },
          style: {
            border: '2px solid hsl(var(--destructive))',
            background: 'hsl(var(--destructive) / 0.2)',
            backdropFilter: 'blur(16px)',
            fontWeight: '600',
            boxShadow: '0 12px 40px hsl(var(--destructive) / 0.4), 0 0 0 1px hsl(var(--destructive) / 0.5), 0 0 30px hsl(var(--destructive) / 0.2)',
          }
        },
        loading: {
          iconTheme: {
            primary: 'hsl(var(--muted-foreground))',
            secondary: 'hsl(var(--background))',
          },
          style: {
            border: '2px solid hsl(var(--border))',
            background: 'hsl(var(--muted) / 0.8)',
            backdropFilter: 'blur(16px)',
            fontWeight: '600',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px hsl(var(--border) / 0.3)',
          }
        }
      }} 
    />
  );
}