import React, { useState } from 'react';
import Server from './Server.js';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function ServerProvider({children}) {

    const serverCall = axios.create({
        baseURL: `${import.meta.env.VITE_API_BACKEND_URL  || "http://localhost:8080/ImageBuddy/"}api`,
        withCredentials: true,
    });

    let[imageList, setImageList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const decoded = token ? jwtDecode(token) : null;
    const [user, setUser] = useState(decoded);
    

    const searchImage = async(item)=>
    {
        try {

            let response = await serverCall.post(`/search/${user.id}`, {item});

            if(response.status == 200)
            {
                console.log(response.data);
                setImageList((preVal)=> preVal = response.data);
                return response.data;
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const getHistory = async()=>
    {
        try {
            let response = await serverCall.post("/history", {id: user.id});
            console.log("history:", response);
            if(response.status == 200)
            {
                return response.data.message;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const topSearches = async()=>
    {
        try {
            let response = await serverCall.get("/topSearch");
        if(response.status == 200)
        {
            return response.data.message
        }
        } catch (error) {
            console.log("err at topSearch", error);
            alert(error)
        }
    }

    const logOut = ()=>
    {
        localStorage.removeItem("token");
        setToken("");
    }

  return (
    <>
      <Server.Provider value={{searchImage, getHistory, imageList, token, setToken, user, setUser, logOut, topSearches}}>
        {children}
      </Server.Provider>
    </>
  )
}

export default ServerProvider
