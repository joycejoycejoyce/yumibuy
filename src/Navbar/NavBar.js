import React from 'react';
import {withStyles, AppBar,Toolbar,Typography,
  Button,InputBase,Modal,Paper,TextField,} from '@material-ui/core';

import User from './User';


const styles = theme =>({
  grow: {
    flexGrow: 1,
  }
})


class NavBar extends React.Component{
    constructor(props){
      super(props);
      this.state={
        userInput: '',
        modalOpen: false,
        username: true,
        password: true,
        email: true,
      };
      super(props);
      this.onInputChange = this.onInputChange.bind(this);
      this.onInputKeyPress = this.onInputKeyPress.bind(this);
      this.modalControl = this.modalControl.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.onInputBlur = this.onInputBlur.bind(this);
    }

    /* Handle Search Bar*/
    onInputChange(e){
      this.setState({
        userInput: e.target.value.trim().toLowerCase()}
      )}; 
    onInputKeyPress(e){
      if (e.keyCode === 13){
        this.setState({userInput:e.target.value.trim().toLowerCase()},
          ()=>{
            this.props.onSearch(this.state.userInput);
          }
        );
      }
    }

    /* Handle Modal */
    modalControl(){
      this.setState({'modalOpen': true});
    }

    handleClose(){
      this.setState({'modalOpen': false});
    }

    onInputBlur(e){
      const input = e.target;
      let re;
      if(input.id==="username"){
         re =/^[a-zA-Z0-9-_.,]{2,15}$/;
      }else if (input.id==="password"){
        re=/^[a-zA-Z0-9,.-]{6,20}$/;
      }else{
        re =/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z0-0]{2,5})$/;
      }
      (re.test(input.value.trim())) ? 
         this.setState({[input.id]: true}) : this.setState({[input.id]: false});
    }

    componentDidMount(){
    }

    render(){
      const {classes} = this.props; 
      console.log('props ', this.props);
      return(
            <div>
        <AppBar position="static">
            <Toolbar>
              <div className="search">
              <Button>
              <i className="material-icons">search</i>
              </Button>
                <InputBase 
                    value={this.state.userInput} 
                    onChange={this.onInputChange}
                    placeholder="I want ..."    
                    onKeyDown = {this.onInputKeyPress}
                />
              </div>
              <div className={classes.grow}>
              <Typography className="grow">
                {this.props.address}
              </Typography>
                 
                <User className="navbarRight" modalControl={this.modalControl}/>
                <Modal
                open = {this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Paper>
                   <div style={{"padding": "20px" }}>
                    <h1 className="align-center" style={{"textAlign": "center"}}>Sign Up</h1>
                    <form>
                      <div className="form-control">
                        <TextField
                          id="username"
                          label="username"
                          type="text"
                          margin="normal"
                          variant="filled"
                          fullWidth
                          onBlur={this.onInputBlur}
                          helperText = { !this.state.username ? 'Please enter a username between 2 to 15 characters, no special characters allowed' : undefined}
                          error = {!this.state.username}
                        />
                      </div>
                      <div className="form-control">
                        <TextField
                          id="password"
                          label="password"
                          type="password"
                          margin="normal"
                          variant="filled"
                          fullWidth
                          onBlur={this.onInputBlur}
                          helperText = { !this.state.password ? 'Please enter a password no shorter than length of 6' : undefined}
                          error = {!this.state.password}
                        />
                      </div>
                      <div className="form-control">
                        <TextField
                          id="email"
                          label="email"
                          type="text"
                          margin="normal"
                          variant="filled"
                          fullWidth
                          onBlur={this.onInputBlur}
                          helperText = { !this.state.email ? 'Please enter a valid email' : undefined}
                          error = {!this.state.email}
                        />
                      </div>
                      <Button variant="contained" fullWidth style={{"margin": "20px 0px"}}>Submit</Button>
                    </form>
                    </div>
                </Paper>
            </Modal>
            </div>
            </Toolbar>
          </AppBar>
            </div>
        );
    }
} 

export default withStyles(styles)(NavBar);