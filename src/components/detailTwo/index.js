import React from 'react';
import one from '@/api/getsort'
import './index.scss'
class DetailTwo extends React.Component{
    constructor(){
        super()
        this.state={
            photo:''
        }
    }
    componentDidMount(){
        this.getcon()
    }
    getcon=async ()=>{
        try{
            let p =await one.getDetail(this.props.id)
            console.log(p.data);
             this.setState({
                 photo:p.data.recite.photo
             })
        }catch(error){
            console.log(error);
        }
    }
    render(){
        return(
        <div>
            <img src={this.state.photo}>
            </img>
            </div>
        )
    }
}
export default DetailTwo