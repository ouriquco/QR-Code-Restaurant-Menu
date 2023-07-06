import React from 'react'

export const TableList = ({name,number,setIsDetail,setOrderList,orderList}) => {

  const handleClick = () => {
    if(name === 'occupied') {
      setIsDetail(true);
      setOrderList(orderList);
    }
  }

  return (
    <div className={`table-number mt-5 md:text-2xl flex items-center justify-center font-bold cursor-pointer md:w-28 md:h-28 rounded-md table-${name}`} onClick={()=>handleClick()}>{number}</div>
  )
}
