import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'

const SearchPage = () => {
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("노트북")
    const [page, setPage] = useState(1);
    const getList = async () => {
        const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
        //console.log(res.data);
        // const data=data.items.map(s=>s && {...s, title:s.title.inneHTML.replace(/<[^>]*>?/g, '')});
        const data = res.data.items;
        setList(data);
    }

    useEffect(() => {
        getList();
    }, [page])

    const onSubmit=(e)=>{
        e.preventDefault();
        if(query===""){
            alert("검색어를 입력하세요")
        }else{
            getList();
        }
    }

    const OnSave = async(shop) =>{
        if(window.confirm("상품을 등록하실래요?")){
            await axios.post("/shop/insert", shop);
            alert("상품 등록완료!")
        }
    }
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품검색</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)} placeholder='상품명, 제조사' value={query}/>
                            <Button>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table striped hover>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>이미지</td>
                        <td>제목</td>
                        <td>가격</td>
                        <td>제조사</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s =>
                        <tr key={s.pid}>
                            <td>{s.productId}</td>
                            <td><img src={s.image} width="50" /></td>
                            <td><div className='ellipsis'>{s.title}</div></td>
                            <td>{s.lprice}</td>
                            <td>{s.maker}</td>
                            <td><Button className='btn-sm' onClick={()=>OnSave(s)}>상품등록</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-2'>{page}</span>
                <Button onClick={()=>setPage(page+1)} disabled={page===10}>다음</Button>
            </div>
        </div>
    )
}

export default SearchPage