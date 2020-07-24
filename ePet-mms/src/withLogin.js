import React from 'react';
import one from '@/api/user-mms'
function withLogin(Oldcomponent) {
    class OuterComponent extends Oldcomponent {
        constructor() {
            super()
            if (!this.state) {
                this.state = {}
            }
            this.state.login = false
        }
        componentDidMount(){
            let token = localStorage.getItem('token');
            if(token){
                this.checklogin(token)
            }else{
                this.props.history.push('/login')
            }
            
           /*  super.componentDidMount(); */
        }
        checklogin=async (token)=>{
            try{
                let p =await  one.checkToken(token)
                if(p.data.flag){
                    this.setState({
                        login:true
                    })
                }else{
                    // console.log(1);
                    this.props.history.push('/login')
                }
            }catch(error){
                console.log(error);
            }
        }
        render() {
            const { login } = this.state;
            if (login) {
                return super.render();
            }
            return <div>请先登录系统</div>
        }
    }
    return OuterComponent
}
export default withLogin