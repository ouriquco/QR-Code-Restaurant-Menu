import React,{useState} from 'react'

export const OrderSummary = ({subtotal,tax,total}) => {

    return (
        <div className="summary-list">
            <div className="summary-info">
                <span>Subtotal</span>
                <span>{`$${subtotal}`}</span>
            </div>
            <div className="summary-info">
                <span>Total tax</span>
                <span>{`$${tax}`}</span>
            </div>
            <div className="summary-info">
                <span>Total</span>
                <span>{`$${total}`}</span>
            </div>
        </div>
    )
}
