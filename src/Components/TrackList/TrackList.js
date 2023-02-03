import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {/* onAdd will be passed to the Track component and will be used to add a track to the playlist */}
        {this.props.tracks.map(track => {
          return <Track track = {track} key = {track.id} onAdd = {this.props.onAdd} 
          // this.props.isRemoval is assigned to the isRemoval property of the Track component to determine if the track should render a + or - sign.
          onRemove ={this.props.onRemove} isRemoval={this.props.isRemoval} />
        })}
      </div>
    );
  }
}

export default TrackList;