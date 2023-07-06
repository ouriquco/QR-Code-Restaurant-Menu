import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export const OrderList = ({name,quantity,amount}) => {

    return (
      <>
      <div className="order-wrapper relative">
        <div className="order-list p-4 flex justify-between">
          <div className="list-left font-bold ml-2 flex items-center tracking-wider">
            <i className="cursor-pointer"><FontAwesomeIcon icon={faCircleXmark}/></i>
            <span className="order-name ml-2">{name}</span>
          </div>
          <div className="list-right mr-4">
            <span className="mr-4 text-xs">{`x${quantity}`}</span>
            <span className="order-amount">{`$${amount}`}</span>
          </div>
        </div>
        <div className="order-border"></div>
      </div>
      </>
    )
}
