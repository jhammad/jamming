import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
        <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue = {'New Playlist'}  />
        {/* passing the playlistTracks state to the TrackList component the playlistTracks state is defined in the App component */}
        {/* onRemove will be passed to the Track component and will be used to remove a track from the playlist */}
        {/* isRemoval will be passed to the Track component and will be used to determine if the track should render a + or - sign */}
        <TrackList tracks={this.props.playlistTracks}                    
                   isRemoval={true} 
                   onRemove={this.props.onRemove} />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;