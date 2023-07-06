import React, {useState } from 'react'
import axios from "axios"
import { InputGroup } from '../components/register/InputGroup'
import { Link,useNavigate } from 'react-router-dom'

export const Register = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPass,setConfirmPass] = useState("");
    const [errors,setErrors] = useState({});


    // POST user data into database. 
    const handleSubmit = async (event) => {
            event.preventDefault();
            if(password === confirmPass) {
                try {
                    const res = await axios.post("http://127.0.0.1:5000/registration",{employeeID:username,password:password})
                    console.log(res)
                    navigate('/login')
        
                } catch(err) {
                    console.error(err);
                    setErrors(err?.response?.data || {});
                }
            } else {
                setErrors({ConfirmPass: "Password does not match"})
            }
      }

    return (
        <div className="bg-white">
        <div className="h-screen flex flex-col items-center justify-center p-6">
            <div className="mx-auto w-10/12 md:w-96">
                <h1 className="mb-2 text-lg font-medium">Register</h1>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                        placeholder='Email'
                        value={email}
                        setValue={setEmail}
                        error={errors.email}
                        type="email"
                    />
                    <InputGroup
                        placeholder='Employee ID'
                        value={username}
                        setValue={setUsername}
                        error={errors.username}
                        type="text"
                    />
                    <InputGroup
                        placeholder='Password'
                        value={password}
                        setValue={setPassword}
                        error={errors.password}
                        type="password"
                    />
                    <InputGroup
                        placeholder='Confirm Password'
                        value={confirmPass}
                        setValue={setConfirmPass}
                        error={errors.ConfirmPass}
                        type="password"
                    />
                    <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                        Sign Up
                    </button>
                </form>
                <small>
                    Do you already have account?
                    <Link to="/login">
                        <a className="ml-1 text-blue-500">Sign In</a>
                    </Link>
                </small>
            </div>
        </div>
    </div>
    )
}
