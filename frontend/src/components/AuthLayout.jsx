import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { ClipLoader } from "react-spinners"; 

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/dashboard")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1 className=''>< ClipLoader/></h1> : <>{children}</>
}

