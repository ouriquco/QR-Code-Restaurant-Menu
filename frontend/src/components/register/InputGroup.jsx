import React from 'react'
import cls from "classnames"

export const InputGroup = ({placeholder,value,setValue,error,text}) => {
  return (
    <div className="mb-2">
        <input
            type={text}
            style={{minWidth: 300}}
            className={cls (
                `w-full p-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white`,
                {
                    "border-red-500": error
                }
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <small className="font-medium text-red-500">{error}</small>
    </div>
  )
}
