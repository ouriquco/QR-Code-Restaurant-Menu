import React, { useState } from 'react'
import { TableMid } from '../components/table/TableMid';
import { TableLists } from '../components/table/TableLists';
import { TableDetail } from '../components/table/TableDetail';
import { Navbar } from '../components/navbar/Navbar';
import { Modal } from '../components/modal/Modal';

export const Table = ({userId,isOpen,setIsOpen,setUserId}) => {

    const [isEmpty,setIsEmpty] = useState('empty');
    const [isDetail,setIsDetail] = useState(false);
    const [orderList,setOrderList] = useState([]);

    return (
        <>
            {isOpen === 'open' && <Modal setIsOpen={setIsOpen} setUserId={setUserId}/>}
            <div className="table-top">
                <Navbar userId={userId} setIsOpen={setIsOpen}/>
                <TableMid setIsEmpty={setIsEmpty} setIsDetail={setIsDetail}/>
            </div>
            <div className="table-container w-full">
                <div className="table-wrapper h-full w-full flex items-center justify-center">
                    {isDetail ? <TableDetail orderList={orderList}/> : <TableLists isEmpty={isEmpty} setIsDetail={setIsDetail} setOrderList={setOrderList}/>}
                </div>
            </div>
        </>
    )
}
