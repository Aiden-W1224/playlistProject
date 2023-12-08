import { useState, useEffect } from "react";
import { fetchTracks } from "../lib/spotify/fetchPlaylists";
import { getYouTubeToken } from "../lib/ytmusic/auth";
import { sendTracks } from "../lib/ytmusic/sendTracks";
import Spinner from "./Spinner";

export default function TransferButton(props: {endpoint: string, accessToken: string, selectedPlaylist: any, playlistName: string, privacy: boolean}) {
  const [result, setResult] = useState<any>(null);
  const [trackArray, setTrackArray] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [privacyStatus, setPrivacyStatus] = useState("PRIVATE");

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

  useEffect(() => {
    props.privacy ? setPrivacyStatus("PUBLIC") : setPrivacyStatus("PRIVATE")
  }, [props.privacy])

  const handleClick = async () => {
    getYouTubeToken()
      .then(result => {
        setLoading(true)
        return sendTracks(props.playlistName, trackArray, privacyStatus)
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
        <button className='bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 mx-7 my-2 rounded focus:ring transform transition duration-300 ease-in-out' onClick={handleClick}>Transfer</button>
        {loading ? <Spinner /> : null}
      </div>
      
    )
  }