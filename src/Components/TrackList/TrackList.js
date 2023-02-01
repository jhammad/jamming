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
          return <Track track = {track} key = {track.id} onAdd = {this.props.onAdd} onRemove ={this.props.onRemove} />
        })}
      </div>
    );
  }
}

export default TrackList;