// clientId is the client ID of the app it will need to be hashed when uplaoding it to the repository 
const clientId = 'fefc16ee1942462bb2f82a7ea0360628';

// redirectUri is the URL of the app
const redirectUri = 'http://localhost:3000/';

// token is the access token for the Spotify token  of the user will be set as empty because we will grab it later
const token = '';

// Spotify object
const Spotify = {
    getAccessToken() {
        // if the token is already set, return the token
        if (token) {
            return token;
        }
        // if the token is not set, check if the URL contains an access token
        // const accessTokenMatch is the access token from the URL of the user the match method returns an array of matches
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);     
        // const expiresInMatch is the expiration time of the access token from the URL of the user the match method returns an array of matches
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // if the URL contains an access token and an expiration time, set the token and expiration time
        if (accessTokenMatch && expiresInMatch) {
            // first of the array of the matches
            token = accessTokenMatch[1];
            // second of the array of the expiration time
            const expiresIn = Number(expiresInMatch[1]);
            // clear the parameters, allowing us to grab a new access token when it expires
            // setTimeout is a method that calls a function or evaluates an expression after a specified number of milliseconds
            window.setTimeout(() => token = '', expiresIn * 1000);
            // history.pushState is used to manipulate the browser's session history in order to create a new entry
            // pushState will clear the parameters, allowing us to grab a new access token when it expires
            window.history.pushState('Access Token', null, '/');
            // redirect user to the following url interpolated with the clientId and redirectUri variables
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

        
        }        
    }}        


export default Spotify;