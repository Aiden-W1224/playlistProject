import { useEffect, useRef, useState } from "react";
import TransferButton from "./TransferButton";
import React from "react";

export default function Modal(props : {openModal : boolean, closeModal : any, 
    endpoint: string, accessToken: string, selectedPlaylist: any}) {

    const ref = React.useRef<HTMLDialogElement>(null);
    const [playlistName, setPlaylistName] = useState(props.selectedPlaylist.name)
    const [isPublic, setPublic] = useState(false);

    useEffect(() => {
        {props.openModal ? ref.current?.showModal() : ref.current?.close()}
    }, [props.openModal])

    useEffect(() => {
        setPlaylistName(props.selectedPlaylist.name)
    }, [props.selectedPlaylist.name])

    return (
        <dialog ref={ref} onCancel={props.closeModal}>
            <div className="flex flex-col gap-y-6 p-8">
                <div className="mb-3">
                    <label htmlFor="email" className="text-sm text-navy-700 dark:text-white font-bold">Default</label>
                    <input type="text" id="email" placeholder="Playlist Name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" 
                    />
                </div>
                <div className="flex flex-row">
                    <p>Private</p>
                    <div className="mx-2 pt-1">
                        <label className="relative cursor-pointer items-center">
                            <input id="switch-2" type="checkbox" className="peer sr-only" onChange={() => setPublic(!isPublic)}/>
                            <label htmlFor="switch-2" className="hidden"></label>
                            <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
                        </label>
                    </div>
                    <p>Public</p>
                </div>
                <div className="flex flex-row">
                    <button type="button" onClick={props.closeModal} className="rounded border border-gray-300 shadow-sm px-4 py-2 mx-7 my-2 bg-white font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">Cancel</button>
                    <TransferButton endpoint={props.endpoint} accessToken={props.accessToken} selectedPlaylist={props.selectedPlaylist} playlistName={playlistName} privacy={isPublic}/>
                </div>
                
            </div>
        </dialog>
    )
}

export function Toggler() {
    return (
        <label className="relative cursor-pointer items-center">
            <input id="switch-2" type="checkbox" className="peer sr-only"/>
            <label htmlFor="switch-2" className="hidden"></label>
            <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
        </label>
    )
}