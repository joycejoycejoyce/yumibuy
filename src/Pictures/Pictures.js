import React from 'react';


class Picture extends React.Component{
    constructor(props){
        super(props);
    }
    state={
        pictures: [],
    }

    componentDidUpdate(prevProps){
        const self = this;
        
        // handle picture display 
        if (prevProps.pics !== self.props.pics){
            let picArr = self.props.pics.data.results.map((img)=>{
                return <img src={img.urls.small} key={img.id} alt={img.description}/>;
                });
            this.setState({pictures: picArr});
        }
    }

    render(){
        return(
            <div className="picture container">
                {this.state.pictures}
            </div>
        );
    }
}

export default Picture;