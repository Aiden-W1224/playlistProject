export async function fetchPlaylists(accessToken: string) {

    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=40', {
        headers: {
        Authorization: 'Bearer ' + accessToken
    
        }
    });

    const data = await response.json();
    return(data);
}