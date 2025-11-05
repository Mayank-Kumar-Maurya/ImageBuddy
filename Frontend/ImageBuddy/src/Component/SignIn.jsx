import React from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'

function SignIn() {

    let navigator = useNavigate();

    return (

        <div className='row m-0 p-0' style={{ height: "100vh" }}>
            <Sidebar />

            <div className=' p-5 d-flex' style={{ width: "80%", justifyContent: "center" }}>

                <form className='col-4 border rounded p-3 align-items-center'>
                    <h3 className='text-center'>SignIn</h3>
                    {/* <!-- Email input --> */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" />
                        <label className="form-label" for="form2Example1">Email address</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" for="form2Example2">Password</label>
                    </div>

                    {/* <!-- 2 column grid layout for inline styling --> */}
                    

                    {/* <!-- Submit button --> */}
                    <div className='mb-2'>
                        <button type="button " onClick={()=>window.open('http://localhost:8080/ImageBuddy/api/auth/facebook')}     style={{ width: "100%" }} className="btn btn-primary btn-block ">
                        <i className="fab fa-facebook-f"></i> SignIn with Facebook
                        </button>
                    </div>
                    <div className='mb-2'>
                        <button type="button " onClick={()=>window.open('http://localhost:8080/ImageBuddy/api/auth/google')}     style={{ backgroundColor: "gray", width: "100%" }} className="btn  btn-block text-light ">
                            <i className="fab fa-google"></i> SignIn with Google
                        </button>
                    </div>
                    <div className='mb-2'>
                        <button type="button" onClick={()=>window.open('http://localhost:8080/ImageBuddy/api/auth/github')} style={{ width: "100%" }} className="btn btn-dark btn-block ">
                            <i className="fab fa-github"></i> SignIn with Github
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignIn
