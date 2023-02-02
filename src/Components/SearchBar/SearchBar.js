import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    // it's always necessary to bind the methods to the component in the constructor
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }


  // method to call the onSearch method passed in from the App component
  search() {
    this.props.onSearch(this.state.searchTerm);
  }

    // method to set the state of the searchTerm property to the value of the input element
    handleTermChange(event) {
      this.setState({ searchTerm: event.target.value });
    }

  render() {
    return (
        <div className="SearchBar">
        <input onChange = {this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button onClick = {this.search} className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;