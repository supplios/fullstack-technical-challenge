import React from 'react';
import { Avatar } from '@nextui-org/react';

export const Profile = () => {
  return (
    <div className="profile flex flex-col justify-center items-center">
      <Avatar
        isBordered
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <span className="font-semibold pt-4">Rasoul Shahriary</span>
      <span className="">Title</span>
    </div>
  );
};
