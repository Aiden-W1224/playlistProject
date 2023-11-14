import React, { useEffect, useState } from 'react';
import { fetchPlaylists, fetchTracks } from '../lib/fetchPlaylists';

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

  console.log(result)

  // Render the items
  return (
    <div className="flex flex-col space-y-4">
      {result.items.map((item: any) => (
        <li className='list-none' key={item.id}><StylePlaylist item = {item}/></li>
      ))}
    </div>
  );
}

export function StylePlaylist(props: {item: any}) {
    let imageUrl = '/defaultPlaylistImage.png';
    if (props.item.images.length > 0) {
      imageUrl = props.item.images[0].url;
    }
    return(
    <div className="flex flex-col max-w-full">
      <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={imageUrl} width='64px' height='64px'/>
            <div className="flex flex-col ml-3">
              <p className="text-sm text-gray-600 leading-none mt-1">{props.item.name}</p>  
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

// export function Songs(endpoint: string, accessToken: string) {
//   const [result, setResult] = useState<any>(null);
//   //const [select, setSelect] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tracksResult = await fetchTracks(endpoint, accessToken);
//         setResult(tracksResult);
//       } catch (error) {
//         console.error('Error fetching tracks:', error);
//       }
//     };

//     fetchData();
//   }, [accessToken]);

//   // Check if result is truthy and has items property
//   if (!result || !result.items) {
//     return <p>Loading...</p>; // or handle the loading state in a different way
//   }
// }


