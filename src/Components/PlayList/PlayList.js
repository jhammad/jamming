import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (
        <div className="Playlist">
        <input defaultValue = {'New Playlist'}  />
        {/* passing the playlistTracks state to the TrackList component the playlistTracks state is defined in the App component */}
        {/* onRemove will be passed to the Track component and will be used to remove a track from the playlist */}
        <TrackList tracks = {this.props.playlistTracks} onRemove = {this.onRemove} isRemoval ="true"/>
        <button class="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;