import React from 'react';
import './index.scss'
import one from '@/api/getsort.js'
class Brand extends React.Component {
    constructor() {
        super()
        this.state = {
            brandList: ''
        }
    }
    componentDidMount() {
        this.getBrand()
    }
    getBrand =async () => {
        try {
            let p =await one.getBrand()
            this.setState({
                brandList: p.data.brand
            })
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        let { brandList } = this.state
        return (
            <>
                {
                    brandList ? <div className='brand'>
                        {
                            brandList.map((item) => (
                                <div key={item.title}>
                                    <p>———&nbsp; {item.title}&nbsp; ———</p>
                                    <ul>
                                        {
                                            item.list.map(it => (
                                                <li key={it.brandid}>
                                                    <main>
                                                        <img src={it.logo} />
                                                    </main>
                                                    <h3>{it.name}</h3>
                                                    <b>{it.address}</b>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                        : <div></div>
                }
            </>
        )
    }
}
export default Brand