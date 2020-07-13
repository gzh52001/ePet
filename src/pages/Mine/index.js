import React,{Component} from 'react';
import Tabbar from '@/components/Tabbar';
import test from '@/api/test';
class Mine extends Component{
    async testData(){
        try{
          let p = await test.getList()
          console.log(p,'111');
        }catch(err){
          console.log(err),'222';
        }
    }
    componentDidMount(){
        this.testData()
    }
    render(){
        return(
            <div>Mine
                <Tabbar/>
            </div>
            
        )
    }
}

export default Mine