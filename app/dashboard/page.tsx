'use client'

import { useState } from "react";
import Playlists from "../ui/playlists";

export default function Page() {
    const accessToken = localStorage.getItem('access_token')!;
    return(
        <Playlists accessToken={accessToken} />
    )
}