'use client'

import Playlists from "../ui/playlists";

export default function Page() {
    const accessToken = localStorage.getItem('access_token')!;
    console.log(accessToken)
    return(
        <Playlists accessToken={accessToken} />
    )
}