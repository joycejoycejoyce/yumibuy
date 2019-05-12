import React from 'react';

const {Button} = window['material-ui'];

class SignIn extends React.Component{
    
    render(){
        return(
            <div>
                <Button variant="contained" color="secondary">
                    Secondary
                </Button>
            </div>

        );
    }

}

export default SignIn;
