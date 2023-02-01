import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import React from 'react';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [ 
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1}
      ],
    }
  }
     
  render(){
    return (
      <div>
      <h1>Ja<span className ="highlight">mmm</span>ing</h1>
      <div className ="App">
        {/* /* <!-- Add a SearchBar component --> */ }
        <div className="App-playlist">          
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults = {this.state.searchResults}/>
          {/* <!-- Add a Playlist component --> */}
        </div>
      </div>
      </div>
    );
}
}

export default App;
