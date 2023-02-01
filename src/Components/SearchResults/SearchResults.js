import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {  
  render() {
    return (
        <div className="SearchResults">
        <h2>Results</h2>
        {/* <!-- Add a TrackList component --> */}
        {/* prop searchResults passed to TrackList component */}
        <TrackList tracks = {this.props.searchResults} onAdd = {this.props.onAdd} isRemoval = "false"/>
      </div>
    );
  }
}

export default SearchResults;