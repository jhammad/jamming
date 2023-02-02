import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';
import React from 'react';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // Setting the state of the searchResults property to an array of 1 object.
      searchResults: [ 
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1}
      ],
      // playlistName that will be passed to the Playlist component
      playlistName: 'My Playlist',
      // playlistTracks that will be passed to the Playlist component
      playlistTracks: [
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2}
      ]
    }
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

  // method to add a track to the playlistTracks state
  addTrack(track){
    // check if the track is already in the playlistTracks state
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // if the track is not in the playlistTracks state, add it to the playlistTracks state
    this.state.playlistTracks.push(track);
    // set the playlistTracks state to the new array of tracks
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  removeTrack(track){
    // filter the playlistTracks state to remove the track that has the same id as the track passed in
    this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    // set this.state.playlistTracks to the new array of tracks
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  // method to update the playlistName state
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    // create an array of track URIs from the playlistTracks state mappping over the playlistTracks state and returning the track.uri
    const trackURIs = this.state.playlistTracks.map(track => track.uri);  
  }

  search(searchTerm){
    console.log(searchTerm);
  }


     
  render(){
    return (
      <div>
      <h1>Ja<span className ="highlight">mmm</span>ing</h1>
      <div className ="App">
        {/* /* <!-- Add a SearchBar component --> */ }
        <div className="App-playlist">          
          {/* pass the searchResults state to the SearchResults component */}
          {/* pass the addTrack method to the SearchResults component as an onAdd property */}
          <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} onSearch = {this.search}/>
          {/* pass the playlistName and playlistTracks state to the Playlist component */}
          <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}
          onRemove ={this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
        </div>
      </div>
      </div>
    );
}
}

export default App;
