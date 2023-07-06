import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'


export const Navbar = ({orderNum,id}) => {

  const navigate = useNavigate();
  
  const handleClcik = () => {
     
  }

  return (
      <nav id="navbar" className="global-nav w-full h-20">
              <ul className="global-nav-links w-1/2 h-full mx-auto flex items-center">
                  <li className="mr-auto cursor-pointer" href="">ICON</li>
                  <li className="nav-ele ml-10 cursor-pointer" href=""><a onClick={() => navigate(`/table=${id}/admin`)}>Home</a></li>
                  <li className="nav-ele ml-10 cursor-pointer w-20 h-8 px-3 py-1 rounded-full bg-red-500 flex justify-between">
                    <a>
                    <FontAwesomeIcon icon={faCartShopping} className="cart-icon"/>
                    </a>
                    <span className="text-white">{orderNum}</span>
                  </li>
              </ul>
        
      </nav>
  )
}
