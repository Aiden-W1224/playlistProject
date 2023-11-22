export const sendTracks = async (playlistName: string, trackArray: any) => {
    const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([trackArray, playlistName]),
      }
      const body = await fetch('http://127.0.0.1:5000/search', payload);
      const response =await body.json();
      console.log(response)
}