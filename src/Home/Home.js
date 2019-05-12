import React from 'react';
import Stepper from './Stepper';
import Location from './Location';

import Template from './ProductTypeTemplate';

const product={
    food: {
        name: 'food',
        subCat: ['Milk Tea', 'Pocky','Hot Strip', 'Pickle Flavor Noodles', 'Hotpot'],
        popular: [{name: 'Popular Snacks',
                    img: '../pic/Product/foodPop.png'
                },
                { name: 'Hotpot Sauce',
                  img: '../pic/Product/foodHotpot.png'
                },
                { name: 'All Sweets For You', 
                  img: '../pic/Product/foodSweet.png'
                },
                {
                  name: 'TV-Snacks Must-Have List',
                  img: '../pic/Product/foodTV.png',
                }
            ],
    }
}
class Home extends React.Component{
    render(){
        return (<div>
            <Stepper/>
            <Location/>
            <Template product={product.food}/>
        </div>)
    }
};

export default Home;