import React, { useState } from 'react'
import { InputGroup } from '../components/register/InputGroup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = ({setUserId}) => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState({});
    


    // GET user data from database
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:5000/auth",{employeeID:employeeID,password:password})
            setUserId(res.data.employeeID)
            navigate(`/${res.data.employeeID}admin`)

        } catch(err) {
            console.error(err);
            setErrors(err?.response?.data || {});
        }
  }

    return (
        <div className="bg-white">
        <div className="h-screen flex flex-col items-center justify-center p-6">
            <div className="mx-auto w-10/12 md:w-96">
                <h1 className="mb-2 text-lg font-medium">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                        placeholder='Employee ID'
                        value={employeeID}
                        setValue={setEmployeeID}
                        error={errors.employeeID}
                    />
                    <InputGroup
                        placeholder='Password'
                        value={password}
                        setValue={setPassword}
                        error={errors.password}
                        type="password"
                    />
                    <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                        Login
                    </button>
                </form>
                <small>
                    Don't have account?
                    <Link to="/">
                        <a className="ml-1 text-blue-500">Register</a>
                    </Link>
                </small>
            </div>
        </div>
    </div>
  )
}
