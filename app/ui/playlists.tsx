import React, { useEffect, useState } from 'react';
import { fetchPlaylists, fetchTracks } from '../lib/spotify/fetchPlaylists';
import { DashboardSkeleton, SongsSkeleton } from './skeletons';
import Modal from './Modal';

export default function Playlists(props: { accessToken: string }) {
  const [result, setResult] = useState<any>(null);
  const [endpoint, setEndpoint] = useState<string>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [modal, setModal] = useState(false);

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
      {/* {endpoint !== "" ? <TransferButton endpoint={endpoint} accessToken={props.accessToken} selectedPlaylist={selectedPlaylist}/> : null} */}
      {endpoint !== "" ?
        <>
          <button className='bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 mx-7 my-2 rounded focus:ring transform transition duration-300 ease-in-out' onClick={() => setModal(true)}>Transfer</button>
          <Modal openModal={modal} closeModal={() => setModal(false)} endpoint={endpoint} accessToken={props.accessToken} selectedPlaylist={selectedPlaylist}/>
        </>
        : null}
      
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

function SearchBar(props : {filterText : string, onFilterChange : any}) {
  return (
    <div className="w-full flex justify-center pe-3 ps-7">
      <div className="relative w-full">
        <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
           value={props.filterText} placeholder="Search..." onChange={(e) => props.onFilterChange(e.target.value)}/>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}




