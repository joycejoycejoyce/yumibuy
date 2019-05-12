import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';

import {theme} from '../api/materialUI';
import NavBar from '../Navbar/NavBar';
import Header from '../HeaderNav/HeaderNav';
import Home from './Home';
import Order from '../Order/Order';
import {GeoBaseURL, GeoKey }from '../api/geolocation';
import {UnsplashSearchURL, UnsplashClientID} from '../api/API';


class App extends Component {
  constructor(props){
    super(props);
    this.onSearchInput = this.onSearchInput.bind(this);
  }
  state ={
    addr : '',
    userRequest : '',
    pics: {},
  }
  // data loading 
  componentDidMount(){
    /* get user current location  */
    window.navigator.geolocation.getCurrentPosition(
      async (pos)=>{
        const url = GeoBaseURL + `?latlng=${pos.coords.latitude},${pos.coords.longitude}&`+GeoKey;
           const addresses =  await axios.get(url);
           const address = addresses.data.results[0].address_components; 
           let addressStr = address.slice(address.length-4,address.length-1).map(function(section){
            return section.short_name;
           })
           addressStr = addressStr.join(', ');
           window.sessionStorage.setItem('location', addressStr);
           this.setState({addr: addressStr});
      })
  };


  /*  Search bar */ 
  async onSearchInput(userReq){
    const res=await axios.get(UnsplashSearchURL, {
      params:{
        query: userReq
      },
      headers:{
        Authorization: UnsplashClientID,
      }
    });
    this.setState({pics: res}); 
  }

  render() {
    console.log(`named element `, this.props);
    return (
    <Router>
     <MuiThemeProvider theme={theme}>
     <CssBaseline/>
      <div className="App" >
        <NavBar onSearch={this.onSearchInput} address={this.state.addr}/> 
        <Header/>
      
      </div>
      <Route exact path="/" component={Home} />
      <Route exact path="/orders" component={Order} />
      </MuiThemeProvider>
      </Router>
    );
  }
};

export default App;
