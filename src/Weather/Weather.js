import React from 'react';

import {openweathermapBaseURL, openweathermapKey} from '../api/API';
import { Z_BLOCK } from 'zlib';

const {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    List, 
    ListItem,
    ListItemText,
    Divider,
  } = window['material-ui'];

class Weather extends React.Component{
    constructor(props){
        super(props);
    }
    
    findLocation(){
        if (window.sessionStorage.getItem('location')){
            return window.sessionStorage.getItem('location');
        }else{
            return `boston,us`;
        }
    }
    
    async weatherAPICall(){
        const url = openweathermapBaseURL+`/?appid=${openweathermapKey}&q=boston,us`;
        const xhr = await window.fetch(url);
        return await xhr.json();
    }

    paintUI(data){
        const wLoc = document.getElementById(`wLoc`);
        const wDes = document.getElementById(`wDes`);
        const wIcon = document.getElementById(`wIcon`);
        const wHumidity = document.getElementById(`wHumidity`);
        const wDew = document.getElementById(`wDew`);
        const wWind = document.getElementById(`wWind`);
        
        wLoc.innerHTML = `${data.city.name}, ${data.city.country}`;
        wDes.innerHTML = `${data.list[0].weather[0].description}`;
        wIcon.setAttribute(`src`, `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
        wHumidity.innerHTML = `Humidity is approximately: ${data.list[0].main.humidity}`;
        wDew.innerHTML = `Dew is: ${ (data.list[0].main.temp *0.1).toFixed(1)} C`;
        wWind.innerHTML = `Wind speed is: ${data.list[0].wind.speed}`;
    }

    componentDidMount(){
        // call the weather API 
        const self = this;
        // 1. find the city and country 
        const location = this.findLocation();
        self.weatherAPICall(location)
        .then((json)=>{
            self.paintUI(json);
        })
    }

    render(){
        return(
            <Grid container splacing={24}>
                <Grid item xs={12}> 
                    <h1>Shopping For Recent?</h1>
                </Grid>
                <Grid item md={6}>
                    <Card style={{'text-align': 'center'}}>
                        <CardContent>
                            <h2 id="wLoc"></h2>
                            <h3 id="wDes"></h3>
                            <img id="wIcon" />
                            <List>
                                <ListItem id="wHumidity" alignItems='center' divider={true} style={{"display": "inline-block", "text-align": "center"}}></ListItem>
                                <ListItem id="wDew" divider={true} style={{"display": "inline-block", "text-align": "center"}}></ListItem>
                                <ListItem id="wWind" style={{"display": "inline-block", "text-align": "center"}}></ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={6}>

                </Grid>
            </Grid>
        );
    }
};

export default Weather;
