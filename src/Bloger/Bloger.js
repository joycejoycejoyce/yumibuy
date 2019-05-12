import React from 'react';
import axios from 'axios';

import {randomuserBaseURL} from '../api/API';

const {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Divider,
  } = window['material-ui'];

const styles = {
    card: {
        width: '45vw',
        position: 'absolute',
        top: '21%',
        left: '28%',
    },
    CardMedia:{
        height: 300,
    }
};


  class Bloger extends React.Component{
    constructor(props){
        super(props);
        this.state={
           modal:[],
           iterator: {},
        }
        this.nextProfile = this.nextProfile.bind(this);
    }

    async getRandomUsers(){
        const url = randomuserBaseURL+`/?gender=female&results=20`;
        const xhr = await axios.get(url);
        return xhr.data;
    }
    
    modalIterator(bloger){
        let index = 0;
        return{
            next: function(){
                if (index >= bloger.length){
                    index = 0;
                } 
                return {value: bloger[index++]}
            }
        }
    }

    nextProfile(){
        const self = this;
        const currentModal = self.state.iterator.next();
        const {name, picture, dob, location, } = currentModal.value;
            const layout = (
                <div>
                <CardMedia
                    image={picture.large}
                    style={styles.CardMedia}
                />
                <CardContent>
                    <div>
                    <span>{name.first} {name.last}, </span>
                    <span>{dob.age}</span>
                    </div>
                    <Divider/>
                    <div>
                        {location.street}, {location.city} {location.state}
                    </div>

                </CardContent>
            </div> 
            );
            self.setState({'modal': layout});
    
            
       
        
    }

    componentDidMount(){
        const self = this;
        self.getRandomUsers()
        .then((json)=>{
            const list = json.results;
            const modals= self.modalIterator(list);
            self.setState({iterator: modals});
            self.nextProfile();
        });
    }

    render(){
        return(
            <div>
                <Card style={styles.card} >
                    {this.state.modal}
                    <CardActions>
                        <Button variant="contained" color="secondary">
                            <i class="material-icons" style={{"padding-right": 5}}>
                                favorite
                            </i>
                            Like
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick = {this.nextProfile}
                        >
                            <i class="material-icons">
                                close
                            </i>
                            Next
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Bloger;