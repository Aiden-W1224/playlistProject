'use client'

import Playlists from "../ui/playlists";

import React, { useEffect } from 'react';

export default function Page() {
    
  const accessToken = localStorage.getItem('access_token')!;

  return (
    <Playlists accessToken={accessToken} />
  );
}
