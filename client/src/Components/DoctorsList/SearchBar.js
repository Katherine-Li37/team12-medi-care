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
        <form>
            <input
                type="text"
                placeholder="Search by Name"
                value={this.props.filterText}
                onChange={this.searchChange}
            />
            {/* <p>
            <input
                type="checkbox"
                checked={this.props.availableOnly}
                onChange={this.handleInStockChange}
            />
            {' '} 
            Only show available doctors
            </p> */}
            <select 
                value={this.state.titleFilter} 
                onChange={this.filterChange} 
            >
                <option value="All">All</option>
                <option value="Dentist">Dentist</option>
                <option value="Orthodontist">Orthodontist</option>
            </select>
        </form>
      );
    }
  }