"use client";

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#1a1a1a',
          color: '#f0f0f0',
          border: '2px solid #333',
          fontSize: '18px',
          padding: '16px 20px',
          fontFamily: '"Source Code Pro", "Courier New", monospace',
          borderRadius: '6px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
          maxWidth: '500px',
          position: 'relative',
          lineHeight: '1.6',
          letterSpacing: '0.5px',
        },
        success: {
          iconTheme: {
            primary: '#0f0', // Terminal neon green
            secondary: '#1a1a1a',
          },
          style: {
            borderLeft: '6px solid #0f0',
          }
        },
        error: {
          iconTheme: {
            primary: '#f00', // Terminal bright red
            secondary: '#1a1a1a',
          },
          style: {
            borderLeft: '6px solid #f00',
          }
        }
      }} 
    />
  );
}