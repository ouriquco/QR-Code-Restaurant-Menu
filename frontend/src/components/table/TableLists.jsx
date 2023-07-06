import React,{useState,useEffect} from 'react'
import { TableList } from './TableList';
import { orders } from '../../data';
import axios from "axios"


export const TableLists = ({isEmpty,setIsDetail,setOrderList}) => {

    const [occupied,setOccupied] = useState(orders);
    const [empty,setEmpty] = useState();

    useEffect(() => {

        if(isEmpty === 'empty') {
            // get empty tables
            const getEmpty = async() => {
    
                const res = await axios.get(`http://127.0.0.1:5000/tables/${0}`)
                setEmpty(res.data)
            }
            getEmpty()

        } 
        // else if(isEmpty === 'occupied') {
        //     // get occupied tables
        //     const getOccupied = async() => {
    
        //         const res = await axios.get(`http://127.0.0.1:5000/tables/${1}`)
        //         setOccupied(res.data)
        //     }
        //     getOccupied()
        // }

    }, [isEmpty]);

    return (
        <div className="table-bottom  w-1/2 my-0 mx-auto">
            <span className='table-name'>{isEmpty}</span>
            <div className="table-list">
                {isEmpty === 'empty' ? empty?.map(tables => (
                    <TableList
                        name={isEmpty}
                        number={tables.table_number}
                        setIsDetail={setIsDetail}
                    />
                )) : occupied?.map(order => (
                    <TableList
                        key={order.table}
                        name={isEmpty}
                        number={order.table}
                        setIsDetail={setIsDetail}
                        setOrderList={setOrderList}
                        orderList={order}
                    />
                ))}
            </div>
        </div>
    )
}
