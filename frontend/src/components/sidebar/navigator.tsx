'use client';
import React from 'react';
import Link from 'next/link';
import {
  EmojiFlagsSharp,
  NoCrashSharp,
  TimelineSharp,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    link: '/',
    Icon: EmojiFlagsSharp,
    label: 'challenge 1',
  },
  {
    link: '/car/challenge-2',
    Icon: NoCrashSharp,
    label: 'challenge 2',
  },
  {
    link: '/car/challenge-3',
    Icon: TimelineSharp,
    label: 'challenge 3',
  },
];

export const Navigator = () => {
  const pathname = usePathname();

  return (
    <div className="pt-6">
      <h5 className="pb-6 text-zinc-500 font-bold">Navigation</h5>
      <ul className="flex flex-col">
        <li>
          {navItems.map(({ link, label, Icon }) => (
            <Link
              href={link}
              key={link + label}
              className="flex gap-3 py-3 first:pt-0 group last:pb-0"
            >
              <Icon
                className={`group-hover:fill-blue-500 ${pathname === link && 'fill-blue-500'}`}
              />
              <span
                className={`group-hover:text-blue-500 capitalize ${pathname === link && 'text-blue-500'}`}
              >
                {label}
              </span>
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
};
