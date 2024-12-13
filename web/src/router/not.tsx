import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Not (){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/')
    },[]);
    
    return <></>
}