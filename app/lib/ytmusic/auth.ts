export const getYouTubeToken = async () => {

    const body = await fetch('http://127.0.0.1:5000/get-token', {mode:'cors'});
    const response = await body.json();

    localStorage.setItem("ytmusicToken", response.access_token)
  
  }