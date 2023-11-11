
import { fetchPlaylists } from "../lib/playlists";

// export default async function Playlists({accessToken}: string) {
//     const playlistJSON = fetchPlaylists(accessToken);

//     console.log(playlistJSON);
// }

export default async function Playlists(props: {accessToken:string}) {

    const result = await fetchPlaylists(props.accessToken);
    console.log(result);
    return <p>result</p>
    
}