import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
import logo from './logo-cu.svg';

class App extends Component {
  /* constructor */
  constructor() {
    super();
    this.state = {
      records: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  getAllCountries = () => {
    /* return all records from database */
    axios
      .get('/getAllCountries')
      .then(result => {
        this.setState({ records: result.data }); //update the 'records' array with all the records retrieved from database
        console.log(this.state.records); //display the 'records' array data in browser console
      })
      .catch(error => {
        console.log(error); //display error message in browser console
      });
  };


  /* run after the first render() lifecycle */
  componentDidMount() {
    this.getAllCountries();
  }


  /* handle form submission (country name search) */
  handleSubmit(e) {
    const query = `/getCountry?country=${this.input.value}`; //insert the user input (country name) from the submitted form to the query string
    console.log(query); //display the query string in browser console
    e.preventDefault();

    /* call api > receive api data > declare new database record > save to database */
    axios
      .get(query)
      .then(result => {
        console.log(result); //display the set of newly added record 
        if (result.data === 'Not found') {
          Popup.alert('Country not found!'); //error message
        }
        this.getAllCountries();
      })
      .catch(error => {
        Popup.alert('Country not found!');
      });
  }


  deleteRecord = value => {
    console.log('To delete: ', value); //display a message in browser console before deletion
    const query = `/deleteCountry?country=${value}`; //query string for delete action

    /* delete the record(s) that satisfy a country name */
    axios
      .get(query)
      .then(result => {
        this.getAllCountries();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };


  /* render HTML to the webpage */
  render() {
    var data = this.state.records; //'records' array data
    data = data.reverse(); //reverse the array elements

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <div className='row'>
            <div className="col-sm-3">
              <img src={logo} className="App-logo" alt="logo" />
              <br /><br />
            </div>
            <div className="col-sm-9">
              <br /><br /><br /><br />
              <h1>Countries & Universities API</h1>
              <p>Search for a country and one of its universities, by inputting the country name!</p>
            </div>
          </div>
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p />
            <form onSubmit={this.handleSubmit}>
              <label>Enter country name:</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter country name ..."
                ref={input => (this.input = input)}
              />
              <p />
              <input type="submit" value="Submit" />
            </form>
            <p />
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <br />

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Poster: 'Country Flag',
                  Cell: row => {
                    return (
                      <div>
                        <img height={50} src={row.original.countryFlag} alt="Country Flag"/>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Country Name',
                  accessor: 'countryName',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Country Capital',
                  accessor: 'countryCapital',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Country Region',
                  accessor: 'countryRegion',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Country Population',
                  accessor: 'countryPopulation',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Country Currency',
                  accessor: 'countryCurrency',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'University Name',
                  accessor: 'uniName',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'University Webpage',
                  accessor: 'uniWebpage',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'University Domain',
                  accessor: 'uniDomain',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Delete',
                  accessor: 'countryName',
                  Cell: ({ value }) => (
                    <button
                      className="button"
                      onClick={() => {
                        this.deleteRecord(value);
                      }}
                    >
                      Delete
                    </button>
                  )
                }
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
