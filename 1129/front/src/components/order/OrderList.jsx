import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';
import ModalOrder from './ModalOrder';

const OrderList = () => {
    const navi=useNavigate();
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size=5;
    const getList = async()=>{
        const res=await axios(`/purchase/list.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        // console.log(res.data)
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getList();
    },[page])

    return (
        <div className='my-5'>
            <h1 className='mb-5 text-center'>주문목록</h1>
            <div>주문수 : {total} 건</div>
            <Table hover bordered>
                <thead className='text-center'>
                    <tr>
                        <td>주문번호</td>
                        <td>주문자명</td>
                        <td>주문일</td>
                        <td>배송지</td>
                        <td>전화</td>
                        <td>금액</td>
                        <td>상세보기</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.oid}>
                            <td>{p.oid}</td>
                            <td>{p.uname}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.address1} {p.address2}</td>
                            <td>{p.phone}</td>
                            <td>{p.fmtsum}원</td>
                            <td><ModalOrder p={p}/></td>
                        </tr>    
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)} />
            }
        </div>
    )
}

export default OrderList