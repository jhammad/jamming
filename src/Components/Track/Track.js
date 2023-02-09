import React from 'react';
import './Track.css';
// Audioplayer installed through npm
// import AudioPlayer from 'react-h5-audio-player';
// Audio Player css to change the style of it
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    // addTrack method that will call the onAdd method that was passed to the Track component from the App component
    // event parameter is passed to the addTrack method. This parameter is used to prevent the default action of the event from occurring.
    addTrack(event) {
      this.props.onAdd(this.props.track);
    }
    
    // removeTrack method that will call the onRemove method that was passed to the Track component from the App component
    removeTrack(event) {
        this.props.onRemove(this.props.track);
    }

    
  
    // Needs to add the isRemoval property to the Track component. This property will be used to determine
    //  if the track should render a + or - sign. If the value of isRemoval is true, then the track should 
    //  render a - sign, otherwise it should render a + sign.
    renderAction() {
      if (this.props.isRemoval) {
        return <button className="Track-action" onClick = {this.removeTrack}>-</button>        
      } 
      else {
        // If the value of isRemoval is false, then the track should render a + sign.        
        return <button className="Track-action" onClick = {this.addTrack}>+</button>

      }
      
    }

    render() {
        return (
        <div className="Track">
        <div className="Track-information">
          {/* props name artist and album go here */}
          {/* props are passed to the Track component from the TrackList component */}
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>      
                                   
        <a className="Track-action">      
          {/* play the song  */}
          <AudioPlayer 
                src={this.props.track.preview}
                // remove autoPlay
                autoPlay={false}
                // get rid of the volume controls
                customVolumeControls={[]}
                // get rid of the customAdditionalControls
                customAdditionalControls={[]}
                // get rid of the showJump controls
                // the time is hidden through css with the .rhap_time class
                showJumpControls={false} 
                
                />  
          {/* <!-- + or - will go here --> */}
          {/* this.props.isRemoval needs to be passed to the renderAction method to determine if the track should render a + or - sign */}
          {this.renderAction(this.props.isRemoval)}
        </a>
      </div>
        );
    }    
    
 }
export default Track;


