This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Make sure you have Node.js 18.17 or later installed.

2. Clone the project

   ```bash
   git clone https://github.com/Aiden-W1224/playlistProject.git
   ```

4. Install Python if you don't already have it.

5. cd into the project folder and run the following commands:
   ```bash
   npm install
   py -3 -m venv .venv
   .venv\Scripts\activate
   pip install Flask
   pip install -U flask-cors
   pip install ytmusicapi
   ```
6. cd into the api folder, then do:
      ```bash
   ytmusicapi oauth
   ```
   and follow the YouTube sign in process that opens up in your browser.
   
7. Create a Spotify Developer Account and follow the steps outlined in
   
   https://developer.spotify.com/documentation/web-api/concepts/apps

   to obtain your CLIENT_ID

8. In your root project directory, create a .env file and add in

   ```bash
   NEXT_PUBLIC_CLIENT_ID = <Your Client Id Here>
   ```
9. To run the development server, 

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
   and on a seperate cmd instance, cd into the api directory and run

   ```bash
   flask --app yt_music run
   ```

   to run the Flask server.

10. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
