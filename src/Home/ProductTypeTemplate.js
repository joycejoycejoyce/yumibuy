import React from 'react';
import {withStyles,Fab, Card,
CardContent} from '@material-ui/core';
import {colors} from '../config';
import SwipeableViews from 'react-swipeable-views';
import Product from './Product';
import Popular from './Popular';


const styles=(theme)=>({
    wrap:{
        position: 'relative',
    },
    background:{
        position: 'absolute',
        background: colors.grey,
        width: '100%',
        height: 372, 
        zIndex:1, 
        top: 30,
    },
    category: {
        position: 'absolute',
        background: colors.brown,
        height: 402,
        zIndex: 2,
        paddingTop: 60,
        paddingLeft: 40,
        color: theme.palette.primary.main,
        // breakpoint 
        [theme.breakpoints.down('md')]:{
            width: 475,
        },
        [theme.breakpoints.up('lg')] :{
            width: 545,
        }
    },
    categoryTitle: {
        fontSize: 30,
        lineHeight: '38px',
        display: 'inline-block',
        textTransform: 'capitalize',
    },
    categorySplit: {
        borderTop: '4px solid #fff',
        margin: `10px 0px`,
    },
    categoryContext: {
        paddingTop: 10,
    },
    btn: {
        background: 'transparent',
        border: '1px solid white',
        boxShadow: 'none',
        color: theme.palette.primary.main,
        marginTop: 20,
        height: 40,   
    },
    swiper:{
        position: 'absolute',
        zIndex:3,
        [theme.breakpoints.down('md')]:{
            width: 'calc(100% - 360px)',
            left: 360,
        },
        [theme.breakpoints.up('lg')]:{
            width: 'calc(100% - 387px)',
            left: 387,
            height: 213,
            bottom:89,
        }
    },
    swiperCard :{
        padding: 15,
    },
    swiperContent:{
        width: 182.5,
        float: 'left',
    },
    swiperImgWrap:{
        width: 168,
        height: 168,
        float: 'right',
    },
    swiperImg:{
        width: 168,
        height: 168,
        borderRadius: 200,
    }
})

class Template extends React.Component{


    render(){
        const { classes, product} = this.props;
        let productContext = product.subCat.map((item, index)=>{
            return (<Product key={index} data={item} class={classes.categoryContext}/>)
        })
        return(<div className={classes.wrap}>
            <div className={classes.background}>
            </div>
            <div className={classes.category}>
                <div className={classes.categoryTitle}>
                    {product.name}
                    <div className={classes.categorySplit}></div>
                </div>
                {productContext}
                <Fab className={classes.btn} variant="extended">
                    View More 
                    <i className={`material-icons ${classes.icon}`}>
                        chevron_right
                    </i>
                </Fab>
            </div>
            <div className={classes.swiper}>
            <SwipeableViews 
                enableMouseEvents
                style={{padding: '0 30px'}}
                slideStyle={{padding: '0 10px'}}
            >
      <div className={classes.swiperCard}>
        <Popular pop={product.popular}/>
      </div>
      <div className={classes.swiperCard}>
      <Popular pop={product.popular}/>
      </div>
      <div className={classes.swiperCard}>
      <Popular pop={product.popular}/>
      </div>
       </SwipeableViews>
            </div>
        </div>)
    }
}

export default withStyles(styles, {withTheme: true})(Template);