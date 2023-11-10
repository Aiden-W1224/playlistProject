export async function authorize() {
    const generateRandomString = (length : number) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
      
    const codeVerifier = generateRandomString(64);

    const sha256 = async (plain : string) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input : any) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
    }

    const hashed = await sha256(codeVerifier);

    const codeChallenge = base64encode(hashed);

    const clientId = 'adc0687f2da046c0851e603068f1ab12';
    const redirectUri = 'http://localhost:3000/';

    const scope = 'playlist-read-private';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
    
}

export const getToken = async () => {

  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code')!;
  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier')!;

  console.log(code);
  console.log(codeVerifier);

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: 'adc0687f2da046c0851e603068f1ab12',
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:3000/',
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch('https://accounts.spotify.com/api/token', payload);
  const response =await body.json();

  localStorage.setItem('access_token', response.access_token);
  
}





