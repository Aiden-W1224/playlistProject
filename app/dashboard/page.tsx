'use client'

import { useState } from "react";
import Playlists from "../ui/playlists";

export default function Page() {
    const accessToken = localStorage.getItem('access_token')!;
    return(
        //<Playlists accessToken={accessToken} />
        <div className="flex max-h-screen w-full px-10 py-32">
            <div className="grid h-screen-15 flex-grow card bg-base-300 rounded place-items-center border-solid border-2 overflow-auto">
                <Playlists accessToken={accessToken}/>
            </div>
            <div className="divider lg: divider-neutral-horizontal">
                
            </div>
            <div className="grid flex-grow card bg-base-300 rounded border-solid border-2 place-items-center overflow-auto">
            </div>
        </div>
    )
}