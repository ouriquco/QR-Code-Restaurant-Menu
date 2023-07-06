import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Modal = ({setIsOpen,setUserId}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        setIsOpen('closed')
        setUserId('')
        navigate('/login')
    }


    return (
        <div className='modal-container fixed top-0 left-0 w-screen h-screen z-10 flex items-center justify-center'>
            <div className='modal-wrapper w-3/12  rounded-md'>
                <h4 className="mb-3 font-bold py-3">Do you wnat to log out?</h4>
                <div className='btn-container flex justify-around'>
                    <button type='button' className='font-bold bg-slate-300 text-orange-500 btn confirm-btn' onClick={() => setIsOpen('closed')}>
                        cancel
                    </button>
                    <button type='button' className='font-bold bg-slate-300 text-orange-500 btn clear-btn' onClick={() => handleClick()}>
                        log out
                    </button>
                </div>
            </div>
        </div>
    )
}
