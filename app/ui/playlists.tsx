import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../lib/fetchPlaylists';

export default function Playlists(props: { accessToken: string }) {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistsResult = await fetchPlaylists(props.accessToken);
        setResult(playlistsResult);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchData();
  }, [props.accessToken]);

  // Check if result is truthy and has items property
  if (!result || !result.items) {
    return <p>Loading...</p>; // or handle the loading state in a different way
  }

  // Render the items
  return (
    <div className="flex flex-col space-y-4">
      {result.items.map((item: any) => (
        <li key={item.id}><StylePlaylist item = {item}/></li>
      ))}
    </div>
  );
}

export function StylePlaylist(props: {item: any}) {
    return(
    <div className="flex flex-col max-w-full">
      <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="flex flex-col ml-3">
              <p className="text-sm text-gray-600 leading-none mt-1">{props.item.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}


