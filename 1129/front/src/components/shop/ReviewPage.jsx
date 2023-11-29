import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "../Pagination.css";
import Pagination from 'react-js-pagination';


const ReviewPage = ({ pid }) => {
    const [body, setBody] = useState('');
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size = 3;

    const getList = async () => {
        const res = await axios(`/review/list.json?page=${page}&size=${size}&pid=${pid}`);
        let data = res.data.list.map(r => r && { ...r, ellipsis: true, view: true, text: r.body });
        // console.log(res.data);
        setList(data);
        setTotal(res.data.total);
    }

    const onRegister = async () => {
        if (body === "") {
            alert("내용을 작성해주세요.");
        } else {
            const data = { pid, uid: sessionStorage.getItem("uid"), body }
            // console.log(data);
            await axios.post("/review/insert", data);
            alert("리뷰가 등록되었습니다.");
            setBody("");
            getList();
        }
    }

    useEffect(() => {
        getList();
    }, [page])

    const onClickLogin = () => {
        sessionStorage.setItem("target", `/shop/info/${pid}`);
        window.location.href = "/login";
    }

    const onClickBody = (cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, ellipsis: !r.ellipsis } : r);
        setList(data);
    }

    const onDelete = async (cid) => {
        if (window.confirm(`${cid}번 리뷰를 삭제하실래요?`)) {
            await axios.post(`/review/delete/${cid}`);
            getList();
        }
    }

    const onClickUpdate = (cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, view: false } : r);
        setList(data);
    }

    const onClickCancel = (cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, view: true, body: r.text } : r);
        setList(data);
    }

    const onChangeBody = (e, cid) => {
        const data = list.map(r => r.cid === cid ? { ...r, body: e.target.value } : r);
        setList(data);
    }

    const onClickSave = async(cid, body, text) => {
        if(body===text){
            onClickCancel(cid);
        }else{
            if(window.confirm(`${cid}번 리뷰를 수정하실래요?`)){
                //리뷰수정
                await axios.post("/review/update", {cid, body});
                alert("수정완료");
                getList();
            }
        }
    }
    return (
        <div>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control onChange={(e) => setBody(e.target.value)} value={body} as="textarea" rows={5} placeholder='리뷰내용을 입력하세요' />
                    <div className='text-end'>
                        <Button onClick={onRegister} className='btn-sm px-5 my-2'>등록</Button>
                    </div>
                </div>
                :
                <div>
                    <Button className='w-100' onClick={onClickLogin}>로그인</Button>
                </div>
            }
            <div><span>리뷰수:{total}</span></div>
            <hr />
            <div className='my-5'>
                {list.map(r =>
                    <div key={r.cid}>
                        <div>
                            <h5>{r.uid}</h5>
                            <small>{r.regdate}</small>
                        </div>
                        {r.view ?
                            //댓글 보기
                            <>
                                <div onClick={() => onClickBody(r.cid)} className={r.ellipsis && 'ellipsis2'} style={{ cursor: 'pointer' }}>[{r.cid}] {r.text}</div>
                                {sessionStorage.getItem("uid") === r.uid &&
                                    <div className='text-end'>
                                        <Button variant='success btn-sm' onClick={() => onClickUpdate(r.cid)}>수정</Button>
                                        <Button onClick={() => onDelete(r.cid)} variant='danger btn-sm ms-1'>삭제</Button>
                                    </div>
                                }
                            </>
                            :
                            //댓글수정
                            <div>
                                <Form.Control as='textarea' rows="5" value={(r.body)} onChange={(e) => onChangeBody(e, r.cid)} />
                                <div className='text-end mt-2'>
                                    <Button onClick={()=>onClickSave(r.cid, r.body, r.text)} variant='primary btn-sm' >저장</Button>
                                    <Button variant='secondary btn-sm ms-1' onClick={() => onClickCancel(r.cid)}>취소</Button>
                                </div>
                            </div>
                        }
                        <hr />
                    </div>
                )}
            </div>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => { setPage(page) }} />
            }
        </div>
    )
}

export default ReviewPage