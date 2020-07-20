import {useState} from 'react';



// const [val,setItem] = useStorage(key)

// console.log(val);
// setItem(key,newval)
function useStorage(key){
    const initData = get(key);
    const [value,setValue] = useState(initData);
    function set(key,val){
        localStorage.setItem(key,JSON.stringify(val));
        setValue(val)
    }
    
    function get(key){
        let res = localStorage.getItem(key);
        if(res){
            return JSON.parse(res)
        }else{
            return ''
        }
    }
    return [value,set]
}
export default useStorage
    
