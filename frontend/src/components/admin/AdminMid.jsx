import React,{useState} from 'react'

export const AdminMid = ({setCategory}) => {


    const handleClick = (name) => {
        setCategory(name)
    }

    return (
        <div className="table-mid w-1/2 my-0 mx-auto box-border h-12">
            <div className="table-buttons admin-buttons flex justify-end">
                <div className="admin-cate mr-auto"><h2>CATEGORY</h2></div>
                <div className="flex">
                    <button className="table-button ml-6 md:px-3.5 md:py-2 border-none cursor-pointer bg-white text-xs font-medium rounded-md" onClick={()=>handleClick('Main')}>Main</button>
                    <button className="table-button ml-6 md:px-3.5 md:py-2 border-none cursor-pointer bg-white text-xs font-medium rounded-md" onClick={()=>handleClick('Pizza')}>Pizza</button>
                    <button className="table-button ml-6 md:px-3.5 md:py-2 border-none cursor-pointer bg-white text-xs font-medium rounded-md" onClick={()=>handleClick('Pasta')}>Pasta</button>
                    <button className="table-button ml-6 md:px-3.5 md:py-2 border-none cursor-pointer bg-white text-xs font-medium rounded-md" onClick={()=>handleClick('Drink')}>Drink</button>
                </div>
            </div>
        </div>
    )
}
