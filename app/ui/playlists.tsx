import React, { useEffect, useState } from 'react';
import { fetchPlaylists, fetchTracks } from '../lib/spotify/fetchPlaylists';
import { sendTracks } from '../lib/ytmusic/sendTracks';
import { getYouTubeToken } from '../lib/ytmusic/auth';
import { DashboardSkeleton, SongsSkeleton } from './skeletons';

export default function Playlists(props: { accessToken: string }) {
  const [result, setResult] = useState<any>(null);
  const [endpoint, setEndpoint] = useState<string>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [filterText, setFilterText] = useState('');

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
        <SearchBar filterText={filterText} onFilterChange={setFilterText}/>
        <div className="max-h-[80vh] overflow-y-scroll mt-4">
          <ul className="list-disc pl-4">
            {result.items.filter((item : any) => item.name.toLowerCase().includes(filterText.toLowerCase())).map((item: any) => (
              <li className='list-none p-3' key={item.id} ref={refs[item.id]} onClick={() => handleClick(item)}><StylePlaylist item = {item} isActive = {item === selectedPlaylist}/></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="max-h-[80vh] overflow-y-scroll mt-[60px]">  
          {endpoint !== "" ? <Songs endpoint={endpoint} accessToken={props.accessToken}/> : null}
        </div>
      </div>
      {endpoint !== "" ? <TransferButton endpoint={endpoint} accessToken={props.accessToken} selectedPlaylist={selectedPlaylist}/> : null}
    </div>
    
  );
}

export function StylePlaylist(props: {item: any, isActive: boolean}) {
    let imageUrl = '/defaultPlaylistImage.png';
    if (props.item.images.length > 0) {
      imageUrl = props.item.images[0].url;
    }
    return(
    <div className="flex flex-col max-w-full">
      <div className={`flex flex-col p-8 shadow-md hover:bg-violet-400 transition ease-in ${props.isActive ? 'bg-violet-500' : " bg-white"} rounded-2xl`}>
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

  const filteredResult = result.items.filter((item : any) => item.track !== null);
  return(
    <div className="flex flex-col space-y-4">
      {filteredResult.map((item: any) => (
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
  const [doneLoading, setDoneLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

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
        setResponse(response)
        if ('status' in response) {
          setLoading(false)
          if(response.songs.length !== 0) {
            setDoneLoading(true)
          }
          console.log(response)
          console.log("here")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='flex w-full items-center'>
      <button className='bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 mx-7 my-2 rounded focus:ring transform transition duration-300 ease-in-out' onClick={handleClick}>Transfer</button>
      {loading ? <Spinner /> : null}
      {doneLoading ? <NotAddedTracksPopup response={response.songs}/> : null}
    </div>
    
  )
}

function SearchBar(props : {filterText : string, onFilterChange : any}) {
  return (
    <div className="w-full flex justify-center pe-3 ps-7">
      <div className="relative w-full">
        <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
           value={props.filterText} placeholder="Search..." onChange={(e) => props.onFilterChange(e.target.value)}/>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
      </div>
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

function NotAddedTracksPopup(props: {response: any}) {
  const [isOpen, setIsOpen] = useState(true);


  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
          <div className='bg-white p-8 shadow-md rounded-md relative'>
            <button className='absolute top-2 right-2 text-gray-500 hover:text-gray-700' onClick={handleClose}>
              Close
            </button>
            <h1 className='text-2xl font-bold mb-4'>The following songs could not be added:</h1>
            {props.response.map((song: string) => (
                      <p>
                        {song}
                      </p>
                    ))}
          </div>
        </div>
      )}
    </>
  );
}



