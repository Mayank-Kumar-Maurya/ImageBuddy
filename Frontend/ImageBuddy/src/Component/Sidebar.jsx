import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Server from '../Context/Server';
import moment from 'moment';

function Sidebar() {

  let { token, user, logOut, getHistory } = useContext(Server);
  let [hist, setHist] = useState([]);

  useEffect(()=>
    {
      //  let callHist = async()=>
       return async()=>
       {
        let res = await getHistory();
        console.log("his", res);
        setHist(res);
       }
    }, [user, getHistory])

    // let dateFormate = (date)=>
    // {
    //   date.toLocaleDateString('en-GB')
    // }

  console.log("user", user)
  console.log("token", token)

  return (
    <>
      <div className='bg-light ' style={{ width: "20%", height: "100%" }}>
        <div className='row p-5 px-4'>
          <h3 style={{ color: "pink" }}>Image Buddy</h3>
          <Link className='my-2 text-decoration-none fs-5 text-dark fw-semibold' to={"/"}><i className="fa-solid fa-house-user me-1"></i>Home</Link>
          {!token ? <>
            <Link className='my-2 text-decoration-none fs-5 text-dark fw-semibold' to={"/signIn"}><i className="fa-solid fa-right-to-bracket me-1"></i>SignIn</Link>
            <Link className='my-2 text-decoration-none fs-5 text-dark fw-semibold' to={"/signUp"}><i className="fa-solid fa-user-plus me-1"></i>SignUp</Link>
          </> : <>
            <Link className='my-2 text-decoration-none fs-5 text-dark fw-semibold' onClick={logOut}><i className="fa-solid fa-user-plus me-1"></i>LogOut<br></br> <i className='text fw-normal'>{user.name}</i> </Link>
            <hr></hr>
            <h6>History</h6>
            {/* <button className='btn btn-dark' onClick={callHist}>Hist</button> */}
            {hist ? <>
              <ul style={{height: "40vh", textAlign: "justify", whiteSpace: "break-spaces", overflowY: "auto", overflowX: "hidden"}}>
              {hist.map((i, index) =>
              (
                <li key={index}>{i.team} Time: {moment(i.timestamp).format("DD/MM/YY")}</li>
              ))}
            </ul>
            </> : null}
          </>
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar
