import React, { useContext, useEffect } from 'react'
import Server from '../Context/Server.js'
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function AuthSuccess() {

    let {setToken, setUser} = useContext(Server);
    let navigate = useNavigate();
    let {token} = useParams();
    useEffect(()=>
        {
            try {
                
                const decoded = jwtDecode(token);
                console.log("decoder: ",decoded)
                if(decoded)
                {
                    localStorage.setItem('token', token);
                    setToken(token);
                    setUser(decoded);
                }
                navigate("/");
            } catch (error) {
                alert(error);
                navigate("/signUp");
            }
            
        }, [navigate])

  return (
    <>
      <h1 className='text-center'>Loading.....</h1>
    </>
  )
}

export default AuthSuccess
