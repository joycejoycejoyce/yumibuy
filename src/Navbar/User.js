import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

import {JsonplaceholderGetUser, JsonplaceholderGetImg} from '../api/jsonplaceholder';

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
    Avatar,
    Menu,
    MenuItem,
  } = window['material-ui'];

  
 class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: [<i className="material-icons" key="1">account_circle</i>],
            menuAnchorEl: null,
            menuOpen: false,
            user : [],
            }
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.signUpProp = this.signUpProp.bind(this);
    }
    

     // avatar 
    async axiosUser(){
        const userNum = Math.floor(Math.random() * 10);
        const avatar = await Axios.get(JsonplaceholderGetImg+'/'+userNum);
        const userInfo =  await Axios.get(JsonplaceholderGetUser+'/'+userNum);
        window.sessionStorage.setItem('user', JSON.stringify({'avatar': avatar.data, 'data': userInfo.data}));
        return {
            avatar : avatar.data,
            userInfo : userInfo.data,
            
        }
    }
     
    displayUser(user){
        const userInfo = user.data;
        const userAvatar = user.avatar;
        
        const avatarElement = [
            <Avatar 
                src={userAvatar.thumbnailUrl}
                key={userAvatar.id} 
                style={{width: "40px"}}
            />
        ];
        this.setState({
            avatar : avatarElement,
            user: userInfo,
        });


    }

    onButtonClick(e){
        this.setState({menuAnchorEl: e.currentTarget,
            menuOpen: true,
        });
    }

    handleClose(){
        this.setState({'menuOpen': false});
    }

    /*  Sign Up */
    signUpProp(){
        this.props.modalControl();
        this.handleClose();
    }
    
    componentDidMount(){
        if (! window.sessionStorage.user){
            this.axiosUser()
            .then((data)=>{this.displayUser(data)});
        }
        else{
            const data = JSON.parse(window.sessionStorage.getItem('user'));
            this.displayUser(data);
        }
      }


    render(){
        return(
        <div id="user">
            <Button onClick={this.onButtonClick}>
                {this.state.avatar}
            </Button>
            <Menu
            id="menu-appbar"
            anchorEl = {this.state.anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open= {this.state.menuOpen}
            onClose={this.handleClose}
            getContentAnchorEl= {null}
            >
            <div>Welcome, {this.state.user.length !==0 ? this.state.user.name : ''}</div>
            <div className="mb-3">New user? <span onClick={this.signUpProp}>Sign Up</span>
            </div>
            <MenuItem>My Profile</MenuItem>
            </Menu>
            <Button Component={Link} to="/orders">
                Order
            </Button>
        </div>
        );
    }
}

export default User;

