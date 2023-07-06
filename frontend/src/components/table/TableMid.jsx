import React from 'react'

export const TableMid = ({setIsEmpty,setIsDetail}) => {


    const handleClick = (name) => {
        setIsEmpty(name);
        setIsDetail(false);
    }
    
    return (
        <div className="table-mid w-1/2 my-0 mx-auto box-border h-12">
            <div className="table-buttons flex justify-end">
                <div className="mr-auto"><h2>CATEGORY</h2></div>
                <div className="flex">
                    <button className="table-button ml-6 md:px-3.5 md:py-2 border-none cursor-pointer bg-white text-xs font-medium rounded-md" onClick={()=>handleClick('empty')}>Empty</button>
                    <button className="table-button ml-6 md:px-3.5 md:py-2 border-none cursor-pointer bg-white text-xs font-medium rounded-md" onClick={()=>handleClick('occupied')}>Occupied</button>
                </div>
            </div>
        </div>
    )
}
