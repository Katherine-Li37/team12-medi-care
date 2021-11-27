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
        this.props.onFilterChange(e.target.value);
        this.setState({
            titleFilter: e.target.value
        });
    }

    searchChange =(e)=>{
        this.props.onSearchChange(e.target.value);
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
            {/* <p>
            <input
                type="checkbox"
                checked={this.props.availableOnly}
                onChange={this.handleInStockChange}
            />
            {' '} 
            Only show available doctors
            </p> */}
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