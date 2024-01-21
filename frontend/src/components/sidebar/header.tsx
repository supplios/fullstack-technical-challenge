import React from 'react';

export const TopNav = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center h-16 ">
      <h1 className="font-bold text-stone-900">{title}</h1>
    </div>
  );
};
