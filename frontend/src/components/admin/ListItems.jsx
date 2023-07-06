import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


export const ListItems = ({name,category,price,calories,url,desc,orderNum,setOrderNum,customerItems,setCustomerItmes}) => {

    const handleClick = (v) => {
        if(v === "add") {
            setOrderNum(orderNum+1)
            const newOrder = {name:name,category:category, price:price,calories:calories, desc:desc}
            setCustomerItmes(prev => [...prev,newOrder])

        } else if(v === "remove") {
            const modItems = customerItems.find(item => item.name === name)
            if(modItems){
                setCustomerItmes(customerItems.filter(item => (
                    item !== modItems
                )))
                setOrderNum(orderNum-1)
            }
        }
    }

    return (
        <div className="item-container w-full my-6 h-52 flex relative">
            <div className="item-left w-4/12 h-full box-border overflow-hidden">
                <img src={`https://res.cloudinary.com/ditgrlpqe/image/upload/v1666679622/CS160_Group_4/Images/Calamari_jeeyiw.jpg
`} className="item-img w-full h-full rounded-md"></img>
            </div>
            <div className="item-right flex flex-col justify-between p-4 w-full">
                <div>
                    <h2 className="text-lg font-bold">{name}</h2>
                    <span className="font-light">{calories}</span>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex">
                        <span className="item-price font-bold">{`$${price}`}</span>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faPlus} className="plus-icon rounded-full border-red-500 border-2 p-0.5 text-red-500 cursor-pointer" onClick={() => handleClick("add")}/>
                        <FontAwesomeIcon icon={faMinus} className="minus-icon rounded-full border-gray-500 border-2 p-0.5 text-black-500 ml-3 cursor-pointer" onClick={() => handleClick("remove")}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
