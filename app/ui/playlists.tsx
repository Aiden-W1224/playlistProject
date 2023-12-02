import React, { useEffect, useState } from 'react';
import { fetchPlaylists, fetchTracks } from '../lib/spotify/fetchPlaylists';
import { sendTracks } from '../lib/ytmusic/sendTracks';
import { getYouTubeToken } from '../lib/ytmusic/auth';
import { DashboardSkeleton, SongsSkeleton } from './skeletons';

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
    return <DashboardSkeleton/>
  }

  const refs = result.items.reduce((acc : any, value : any) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const handleClick = (item: any) => {
    refs[item.id].current.scrollIntoView({behavior: 'smooth', block : 'start'});
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
              <li className='list-none p-3' key={item.id} ref={refs[item.id]} onClick={() => handleClick(item)}><StylePlaylist item = {item}/></li>
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
    return <SongsSkeleton/>
  }
  return(
    <div className="flex flex-col space-y-4">
      {result.items.map((item: any) => (
        <li className='list-none p-3' key={item.track.id}>
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
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleClick = async () => {
    getYouTubeToken()
      .then(result => {
        setLoading(true)
        return sendTracks(playlistName, trackArray)
      })
      .then(response => {
        if ('status' in response) {
          setLoading(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='flex w-full items-center'>
      <button className='bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 mx-7 my-4 rounded focus:ring transform transition duration-300 ease-in-out' onClick={handleClick}>Transfer</button>
      {loading ? <Spinner /> : null}
    </div>
    
  )
  

}

function Spinner() {
  return (
    <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-green-600 rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}



