import React from 'react';

const Product=(props)=>{
    return(<div className={props.class} key={props.key}>
        {props.data}
    </div>);
}

Product.defaultProps={
    class: '',
    key: 0,
    data: '',
};

export default Product;