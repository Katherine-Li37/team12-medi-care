import React, { Component } from 'react';

export default class SearchBar extends Component{
    constructor(props) {
        super(props); 
        this.state = {
            searchText: '',
            titleFilter: 'All'
        }       
    }
    
    filterChange =(e)=>{
        this.props.onFilterSearchChange(e.target.value, this.state.searchText);
        this.setState({
            titleFilter: e.target.value
        });
    }

    searchChange =(e)=>{
        this.props.onFilterSearchChange(this.state.titleFilter, e.target.value);
        this.setState({
            searchText: e.target.value
        });
    }
    
    render() {
      return (
        <div className="container">
        <form className="row">
            <div className="col-lg-3 col-md-3">
            <input
                type="text"
                placeholder="Search by Name"
                value={this.props.filterText}
                onChange={this.searchChange}
            />
            </div>
            <div className="col-lg-6 col-md-6">
            <span>Filter by position: </span>
            <select 
                value={this.state.titleFilter} 
                onChange={this.filterChange} 
            >
                <option value="All">All</option>
                <option value="Dentist">Dentist</option>
                <option value="Orthodontist">Orthodontist</option>
            </select>
            </div>
        </form>
        </div>
      );
    }
  }