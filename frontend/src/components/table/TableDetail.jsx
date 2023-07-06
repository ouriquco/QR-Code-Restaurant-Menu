import React,{useState,useEffect} from 'react'
import { OrderList } from '../order/OrderList'
import { OrderSummary } from '../order/OrderSummary';

export const TableDetail = ({orderList}) => {

    const [subtotal,setSubtotal] = useState();
    const [tax,setTax] = useState();
    const [total,setTotal] = useState();

    useEffect(() => {
        let total = 0;
        let tax = 0;
        orderList.orders.map(order => (
            Object.entries(order).map(([name,values]) => (
                total += parseFloat(values[0]) * parseFloat(values[1])
            ))
        ))
        tax = (total * (20/100)).toFixed(2);
        setSubtotal(total.toFixed(2));
        setTax(tax);
        setTotal(parseFloat(total) + parseFloat(tax));
    },[])

    return (
        <div className="table-bottom table-detail-bottom w-1/2 my-0 mx-auto">
            <span className='table-name table-detail-name'>{`Table ${orderList.table}`}</span>
            <div className="order-container">
                <div className="order-info flex flex-col rounded-2xl my-5">
                    {orderList.orders.map(order => (
                        Object.entries(order).map(([name,values]) => (
                        <OrderList
                            name={name}
                            quantity={values[0]}
                            amount={values[1]}
                        />
                        ))
                    ))}
                </div>
                <div className="order-info mb-4">
                    <OrderSummary subtotal={subtotal} tax={tax} total={total}/>
                </div>
                <div className="order-buttons flex flex-col items-center justify-center mt-6">
                    <button>Update Order</button>
                    <button>Print Bill</button>
                </div>
            </div>
        </div>
    )
}
