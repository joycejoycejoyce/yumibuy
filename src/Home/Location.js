import React from 'react';
import {Typography, withStyles, Button, Fab} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import {UnsplashSearchURL, UnsplashClientID} from '../api/API';
import Japan from '../pic/Location/Japan.png';
import Korea from '../pic/Location/Korea.png';
import Taiwan from '../pic/Location/Taiwan.png';
import HK_Macao from '../pic/Location/HK&Macao.png';
import Beijing from '../pic/Location/Beijing.png';
import Shanghai from '../pic/Location/Shanghai.png';
import Sichuan from '../pic/Location/Sichuan.png';
import Shanxi from '../pic/Location/Shanxi.png';
import { inherits } from 'util';

const images = [
    [
    {image: Japan,
     text: 'Japan',
    }, 
    {image: Korea,
     text:'Korea'},
    {image: HK_Macao,
     text: 'HK & Macao'
    },
    { image: Taiwan, 
     text:'Taiwan'
    },
   ],
   [
    {image: Beijing,
     text:'Beijing'
    },
     {image: Shanghai,
     text: 'Shanghai'
    },
    {image: Sichuan,
      text:'Sichuan & Chongqing'
    },
    {image: Shanxi,
        text:'Shanxi'
    },
   ]
];


const styles = theme =>({
    text:{
        fontSize: 30,
    fontWeight: 700,
    lineHeight: '38px',
    display: 'block',
    },
    subText:{
        marginTop: 10,
        color: theme.palette.text.secondary
    },
    wrap:{
        position: 'relative',
        padding: "0 40px",
        marginTop: 30,
    },
    flexContainer:{
        display: 'flex',
    },
    flexItem: {
        flexBasis: '25%',
        textAlign: 'center',
    },
    image: {
        width: 165
    },
    btnPrevRoot:{
        position: 'absolute',
        top: '20%',
        zIndex: 10,
    },
    btnNextRoot:{
        position: 'absolute',
        top: '20%',
        left: '90%',
        zIndex: 10,
    },
    btnLabel: {
        color: theme.palette.text.secondary,
        fontSize : 36,
      },
    icon:{
        fontSize: 'inherit',
    },

    
    
});


class Location extends React.Component{
    constructor(props){
        super(props);
        this.hangleBackward = this.hangleBackward.bind(this);
        this.hangleForward = this.hangleForward.bind(this);
    }
    state={
        current : 0,
    };

    hangleForward(){
        const submax = images.length-1;
        this.setState(prevState =>(
             prevState.current === submax ?
              {current: 0} : 
              {current: prevState.current+1}
            ));
    }

    hangleBackward(){
        const submax = images.length-1;
        this.setState(prevState =>(
            prevState.current ===0 ? 
            {current: submax} : 
            {current: prevState.current-1}))
    }

    getLocationImages(subarr){
        return subarr.map((item)=>{
            return (<div className={this.props.classes.flexItem}>
                <img className={this.props.classes.image} src={item.image}/>
                <div>{item.text}</div>
            </div>)
        })

    };
    componentDidMount(){

    };

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Typography align="center">
                    <span className={classes.text}>
                        One-stop Shop for Asian Products
                    </span>
                    <span className={classes.subText}>
                        We collect items from all around the Asian areas
                    </span>
                </Typography>
               <div className={classes.wrap}>
               <Fab 
                    classes={{
                        root: classes.btnPrevRoot,
                        label: classes.btnLabel,
                    }} 
                    onClick={this.hangleBackward}
                    color = "primary"    
                >
                    <i className={`material-icons ${classes.icon}`} >
                        chevron_left
                    </i>
                </Fab>
               <SwipeableViews
                index={this.state.current}
               >
                    { images.map((sub, index)=>{
                        return(<div className={classes.flexContainer} key={index}>
                                {this.getLocationImages(sub)}
                        </div>)
                    })}
                </SwipeableViews>
                <Fab 
                    onClick={this.hangleForward}
                    classes={{
                        root: classes.btnNextRoot,
                        label: classes.btnLabel,
                    }}
                    color="primary"
                >
                    <i className={`material-icons ${classes.icon}`}>
                        chevron_right
                    </i>
                </Fab>
            </div>
            </div>
        );
    }

}

export default withStyles(styles, {withTheme: true})(Location);