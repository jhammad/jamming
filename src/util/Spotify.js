// clientId is the client ID of the app it will need to be deleted when uploading it to the repository \
// redirectUri is the URL of the app
const redirectUri = 'http://localhost:3000/';



// token is the access token for the Spotify token  of the user will be set
// as empty because we will grab it later // it need to be a let because we will change it later
let token = '';

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
            console.log(accessTokenMatch)
            token = accessTokenMatch[1];
            console.log(token)
            // second of the array of the expiration time
            const expiresIn = Number(expiresInMatch[1]);
            // clear the parameters, allowing us to grab a new access token when it expires
            // setTimeout is a method that calls a function or evaluates an expression after a specified number of milliseconds
            window.setTimeout(() => token = '', expiresIn * 1000);
            // history.pushState is used to manipulate the browser's session history in order to create a new entry
            // pushState will clear the parameters, allowing us to grab a new access token when it expires
            window.history.pushState('Access Token', null, '/');
            // return the token
            return token;
        } else {
            // redirect user to the following url interpolated with the clientId and redirectUri variables
            // redirectUri needs to be added to the accepted Spotify redirect URIs on the Spotify API 
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;        
        }            
    },
    // search is a method that takes a term as an argument and returns a promise that resolves to an array of tracks that match the search term
    search(searchTerm) {
        // it's necessary to obtain a new access token triggering the Spotify authorization flow.
        const token = Spotify.getAccessToken();        
        console.log(token)
        // fetch the access token from the Spotify API and return a promise that resolves to the JSON response
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
        //  concate a then method to the promise that returns a promise that resolves to the JSON response
        }).then(response => {
            return response.json();
        }
        // concate a then method to the promise that returns a promise that resolves to an array of tracks
        ).then(jsonResponse => {
            // if there is no tracks in the JSON response, return an empty array
            if (!jsonResponse.tracks) {
                return [];
            }
            // if there is a tracks in the JSON response, return an array of tracks
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri            
            }));
        }
        );
    },

    // method that accepts a playlist name and an array of track URIs
    savePlaylist(playlistname, trackUris) {
        // if there is no name or track URIs, we return (we used the length value to check if the array is empty)
        if (!playlistname || !trackUris.length) {
            return;
        }
        // fetch the access token from the Spotify API and return a promise that resolves to the JSON response using the getAccessToken method
        const accessToken = Spotify.getAccessToken();
        // headers is an object that contains the access token of the user Bearer is the type of the token (used also in the fetch method)
        const headers = { Authorization: `Bearer ${accessToken}` };
        // userID is the user ID of the user
        let userID = '';
        // fetch the user ID from the Spotify API and return a promise that resolves to the JSON response 
        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        // concate a then method to the promise that returns a promise that resolves to the JSON response
        ).then(response => {
            return response.json();
        }
        // concate a then method to the promise that returns a promise that resolves to the user ID
        ).then(jsonResponse => {
            // set the user ID to the value ID of the jsonResponse 
            userID = jsonResponse.id;
            // fetch the user ID from the Spotify API and return a promise that resolves to the JSON response
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                // stringify will convert the object to a JSON string
                body: JSON.stringify({ name: playlistname })
            // concate a then method to the promise that returns a promise that resolves to the JSON response
            }).then(response => {
                return response.json();
            }
            // concate a then method to the promise that returns a promise that resolves to the playlist ID
            ).then(jsonResponse => {
                // set the playlist ID to the ID of the playlist
                const playlistID = jsonResponse.id;
                // fetch the playlist ID from the Spotify API and return a promise that resolves to the JSON response
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                });
            });
        });
    }    
};   
export default Spotify;