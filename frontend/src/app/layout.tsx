import React, { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';
import { Sidebar } from '@/components/sidebar';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex w-full">
            <Sidebar />
            <div className="w-full px-6">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
