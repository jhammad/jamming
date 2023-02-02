import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    render() {
        return (
        <div className="Track">
        <div className="Track-information">
          {/* props name artist and album go here */}
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button className="Track-action"></button>
      </div>
        );
    }    
    // addTrack method that will call the onAdd method that was passed to the Track component from the App component
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    
    // removeTrack method that will call the onRemove method that was passed to the Track component from the App component
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
      if (this.props.isRemoval) {
        return <a className="Track-action" onClick = {this.removeTrack}>-</a>
      } else {
        // onClick property that will call the method named addTrack
        return <a className="Track-action" onClick = {this.addTrack}>+</a>
      }
    }
 }
export default Track;