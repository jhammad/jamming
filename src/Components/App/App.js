import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // Setting the state of the searchResults property to an array of 1 object.
      searchResults: [],
      // playlistName that will be passed to the Playlist component
      playlistName: 'My Playlist',
      // playlistTracks that will be passed to the Playlist component
      playlistTracks: []
    };
    // binding the addTrack method to the App component
    this.addTrack = this.addTrack.bind(this);
    // binding the removeTrack method to the App component
    this.removeTrack = this.removeTrack.bind(this);
    // binding the this.updatePlaylistName method to the App component
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    // binding the this.savePlaylist method to the App component
    this.savePlaylist = this.savePlaylist.bind(this);
    // binding the this.search method to the App component
    this.search = this.search.bind(this);
   
  }

  // Access to Spotify.getAccessToken method when the page loads and the user is not logged in to Spotify
  componentDidMount(){
    Spotify.getAccessToken();
  }

  search(searchTerm){ 
    // call the search method from the Spotify module passing in the searchTerm
    Spotify.search(searchTerm).then(searchResults => {
      // set the searchResults state to the searchResults returned from the Spotify.search method
      this.setState({searchResults: searchResults});
    });  
    console.log("search in App.js")
  }

  // method to add a track to the playlistTracks state
  addTrack(track){
    // define tracks as the playlistTracks state
    let tracks = this.state.playlistTracks;
    // check if the track is already in the playlistTracks state
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // if the track is not in the playlistTracks state, add it to the playlistTracks state
    this.state.playlistTracks.push(track);
    // set the playlistTracks state to the new array of tracks
    this.setState({playlistTracks: this.state.playlistTracks});
    console.log(this.state.playlistTracks)
  }


  



  // method to remove a track from the playlistTracks state
  removeTrack(track){
    console.log("removeTrack method called")
    // filter the playlistTracks state to remove the track that has the same id as the track passed in
    // this.state.playListTrack is defined by the state of the playlistTracks property in the App component's constructor method.
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id);
    // set this.state.playlistTracks to the new array of tracks
    this.setState({playlistTracks: tracks});
    console.log(this.state.playlistTracks)
  }


  // method to update the playlistName state
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(event){
    // create an array of track URIs
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    // call the savePlaylist method from the Spotify module passing in the playlistName and trackURIs
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      // set the playlistName state to 'New Playlist'
      this.setState({playlistName: 'New Playlist'});
      // set the playlistTracks state to an empty array
      this.setState({playlistTracks: []});
    });
    event.preventDefault();     
  }

 

     
  render(){
    return (
      <div>
      <h1>Spotify<span className ="highlight">Playlist</span>ing</h1>
      <div className ="App">
        {/* /* <!-- Add a SearchBar component --> */ }
        <SearchBar onSearch = {this.search}/>
        <div className="App-playlist">          
          {/* pass the searchResults state to the SearchResults component */}
          {/* pass the addTrack method to the SearchResults component as an onAdd property */}
          <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>
          {/* pass the playlistName and playlistTracks state to the Playlist component */}
          <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}
          onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} onSave = {this.savePlaylist}/>
        </div>
      </div>
      </div>
    );
}
}

export default App;
