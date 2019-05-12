import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils'

import {MobileStepper, Button, withStyles,
    Hidden, withWidth} from '@material-ui/core';
// import Button from '@material-ui/core/Button';

import p1 from '../pic/promotion1.jpeg';
import p2 from '../pic/promotion2.jpeg';
import p3 from '../pic/promotion3.png';
import p4 from '../pic/promotion4.jpeg';
import p5 from '../pic/promotion5.png';

const promotionPics = [p1, p2, p3, p4, p5];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme =>({
    mobileStepper:{
        opacity: 0.2,
        bottom: 56,
        position: 'relative',
        height: 40,
    },
    imageWrap:{
        width: '100vw',
        minWidth: theme.breakpoints.width('md'),
    },
    image: {
        width: '100%',
        
    },
    container:{
        display: 'flex',
    }

})

class Stepper extends React.Component{
    constructor(props){
        super(props);
        this.carouselForward =this.carouselForward.bind(this); 
        this.carouselBack =this.carouselBack.bind(this); 
        this.handleStepChange =this.handleStepChange.bind(this); 
    }

    state = {
      activeStep: 0,
    }

  carouselForward(){
    const maxStep = promotionPics.length-1;
    this.setState(prevState=>(
        {
        activeStep: prevState.activeStep ===maxStep ? 0 : prevState.activeStep+1,
    }));
  };

  carouselBack(){
      const maxStep = promotionPics.length -1;
      this.setState(prevState=>(
          {
          activeStep: prevState.activeStep === 0 ? maxStep : prevState.activeStep -1
      }))
  }
  
  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render(){
      const {activeStep} = this.state;
      const maxSteps = promotionPics.length;
      const {classes, theme} = this.props;
      return(<div>
              <AutoPlaySwipeableViews
               axis={theme.direction ==='ltr' ? 'x' : 'x-reverse'}
               index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
            >
            {
            promotionPics.map((img,index)=>(
                <div className={classes.imageWrap} key={index}>
                    <img className={classes.image} src={img}/>
                </div>
            ) 
            )
            }
          </AutoPlaySwipeableViews>
          <MobileStepper
            className={classes.mobileStepper}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
                <Button
                  id="forward"
                  size="small"
                  onClick={this.carouselForward}
                >
                    <i class="material-icons">
                        chevron_right
                    </i>
                </Button>
            }
            backButton={
                <Button
                    size="small"
                    onClick = {this.carouselBack}
                >
                <i className="material-icons">
                    chevron_left
                </i>
                </Button>
            }
          />    
      </div>);
  }

}

export default withStyles(styles, {withTheme: true})(Stepper);