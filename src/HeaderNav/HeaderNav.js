import React from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


const {
    AppBar,
    Toolbar,
    Button,
    Typography,
    List,
    ListItem,
    Grid,
    withStyles,
    Menu,
  } = window['material-ui'];

const NavListItem = withStyles(({
    root: {
        display: 'inline'
    }
}))(ListItem);

const styles = {
    MenuButton:{
        color: '#bbb'
    }
};

const Typo = withStyles(({
    root:{
        flexGrow: 1
    }
}))(Typography);


 class HeaderNav extends React.Component{
     constructor(props){
         super(props);
         this.state={
             catMenuOpen : false,
             anchorEl: null,
         }
         this.onButtonHover = this.onButtonHover.bind(this);
         this.handleClose = this.handleClose.bind(this);
     }

     handleClose(){
        this.setState({catMenuOpen: false});
     };

     onButtonHover(e){
         this.setState({catMenuOpen: true});
     }

    render(){
        const {catMenuOpen,anchorEl} = this.state;
        return(
    <div>
        <AppBar position="static">
        <Toolbar variant="dense" flex-grow={1}>
         <div
         onMouseEnter={this.onButtonHover}
         >
            <Button 
                style={styles.MenuButton} 
            >
                <i class="material-icons">
                    menu
                </i>
            </Button>
         </div>
            <Menu
                open={catMenuOpen}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizonal:'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizonal:'left',
                }}
            >
                <div>Snacks</div>
                <ul>
                    <li>Instant Food, Seasonings</li>
                    <li>Tea, Drinks, Oatmeal</li>
                    <li>Jerky, Dried Seafood, Nuts</li>
                </ul>
            </Menu>
            <Typo
                noWrap
            >
            <Grid item xs={9}>
               <List>
                   <NavListItem>Recommended</NavListItem>
                   <NavListItem>Food</NavListItem>
                   <NavListItem>Beauty</NavListItem>
                   <NavListItem>Home</NavListItem>
                   <NavListItem >Health &amp; Baby</NavListItem>
                   <NavListItem >Marketplace</NavListItem>
                   <NavListItem >More</NavListItem>
               </List>
               </Grid>
            </Typo>
            <div>
                <Typography noWrap>
                    <List>
                        <NavListItem>Help</NavListItem>
                        <NavListItem>中文</NavListItem>
                    </List>
                </Typography>
            </div>
        </Toolbar>
    </AppBar>



            </div>
        );
    };
 };


 export default withWidth()(HeaderNav);