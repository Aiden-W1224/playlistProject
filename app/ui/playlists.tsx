import React, { useEffect, useState } from 'react';
import { fetchPlaylists, fetchTracks } from '../lib/spotify/fetchPlaylists';
import { sendTracks } from '../lib/ytmusic/sendTracks';
import { send } from 'process';
import { getYouTubeToken } from '../lib/ytmusic/auth';

export default function Playlists(props: { accessToken: string }) {
  const [result, setResult] = useState<any>(null);
  const [endpoint, setEndpoint] = useState<string>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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

  const handleClick = (item: any) => {
    setEndpoint(item.tracks.href);
    setSelectedPlaylist(item);
  }

  // Render the items
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <div className="max-h-[80vh] overflow-y-scroll mt-4">
          <ul className="list-disc pl-4">
            {result.items.map((item: any) => (
              <li className='list-none p-3' key={item.id} onClick={() => handleClick(item)}><StylePlaylist item = {item}/></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="max-h-[80vh] overflow-y-scroll mt-4">  
          {endpoint !== "" ? <Songs endpoint={endpoint} accessToken={props.accessToken}/> : null}
        </div>
      </div>
      {endpoint !== "" ? <TransferButton endpoint={endpoint} accessToken={props.accessToken} selectedPlaylist={selectedPlaylist}/> : null}
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
      <div className="flex flex-col p-8 bg-white shadow-md hover:bg-violet-400 transition ease-in rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={imageUrl} width='64px' height='64px'/>
            <div className="flex flex-col ml-3">
              <p className="font-bold text-gray-600 leading-none mt-1">{props.item.name}</p>  
            </div>
          </div>
          {props.item.public ? <img src='/public-icon.svg' alt='public' width='18px' height='18px'/> : <img src='/private-icon.svg' alt='private' width='18px' height='18px'/>}
        </div>
      </div>
    </div>
    );
}

export function Songs(props: {endpoint: string, accessToken: string}) {
  const [result, setResult] = useState<any>(null);
  //const [select, setSelect] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setResult(null);
        const tracksResult = await fetchTracks(props.endpoint, props.accessToken);
        setResult(tracksResult);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchData();
  }, [props.endpoint]);

  // Check if result is truthy and has items property
  if (!result || !result.items) {
    return <p>Loading...</p>; // or handle the loading state in a different way
  }
  return(
    <div className="flex flex-col space-y-4">
      {result.items.map((item: any) => (
        <li className='list-none' key={item.track.id}>
          <div className="flex flex-col max-w-full">
            <div className="flex flex-col p-8 bg-white shadow-md hover:bg-violet-400 transition ease-in rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col ml-3">
                    <p className="font-bold text-gray-600 leading-none mt-1">{item.track.name}</p>
                    {item.track.artists.map((artist: any) => (
                      <p className="text-sm text-gray-600 leading-none mt-1">
                        {artist.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>    
  );
}

function TransferButton(props: {endpoint: string, accessToken: string, selectedPlaylist: any}) {
  const [result, setResult] = useState<any>(null);
  const [trackArray, setTrackArray] = useState<any>([]);

  let playlistName: string = props.selectedPlaylist.name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setResult(null);
        const tracksResult = await fetchTracks(props.endpoint, props.accessToken);
        setResult(tracksResult);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchData();
  }, [props.endpoint]);

  useEffect(() => {
    if (result && result.items) {
      setTrackArray([...result.items])     
    }
  }, [result])

  if(trackArray.length > 0) {
    //console.log(trackArray[0].track.name);
    //console.log(trackArray[0].track.artist[0])
  }
  // let string = "";
 

  
  const handleClick = () => {
    getYouTubeToken().then(
      result => {
        sendTracks(playlistName, trackArray);
      }).
      catch(error => {
        console.log(error);
      });
  };

  return <button onClick={handleClick}>Transfer</button>

}


