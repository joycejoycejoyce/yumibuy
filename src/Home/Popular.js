import React from 'react';
import {Card, CardContent} from '@material-ui/core';

const styles ={
    cardTitle:{
        fontSize: 22,
        lineHeight: 28,
    }
};

function displayProductImg(img){
    return (<img src={" "+img}/>);
}

const Popular =(props) =>{
    console.log("-----props=",props);
    const {pop} = props;
 return(
    <Card>
    <CardContent>
        <div className="slide_box-describe">
            <a href="#">
                {pop[0].name}
            </a>
        </div>
        <div className="slide_box-albums">
            {displayProductImg(pop[0].img)}
        </div>
    </CardContent>
</Card>
 )
}

export default Popular;
