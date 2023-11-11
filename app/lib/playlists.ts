async function playlists() {
    let accessToken = localStorage.getItem('access_token');

  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  
  console.log(data);
}