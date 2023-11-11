import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../lib/playlists';

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
    <div>
      <p>Total: {result.total}</p>
      <ul>
        {result.items.map((item: any) => (
          <li key={item.id}>{item.name}</li> // Adjust the property names based on your data structure
        ))}
      </ul>
    </div>
  );
}
