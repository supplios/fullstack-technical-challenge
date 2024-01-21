import React from 'react';
import { Profile } from './profile';
import { Navigator } from './navigator';

export const Sidebar = () => {
  return (
    <nav className="min-w-60 max-w-60 h-screen py-10 px-4 bg-white">
      <Profile />
      <Navigator />
    </nav>
  );
};
