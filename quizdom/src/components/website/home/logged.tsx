import React from 'react';

import { Team } from '@/context/context';

import { useAuthContext } from '@/context/state';

export default function Logged() {

  const context = useAuthContext();
  const {team} = context;
  return (
    <div>
      Logged In
      {team.id}
    </div>
  )
}
