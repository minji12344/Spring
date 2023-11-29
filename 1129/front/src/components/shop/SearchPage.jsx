import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table, Spinner } from 'react-bootstrap'

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("노트북")
    const [page, setPage] = useState(1);
    const [cnt, setCnt] = useState(0);

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
        //console.log(res.data);
        // const data=data.items.map(s=>s && {...s, title:s.title.inneHTML.replace(/<[^>]*>?/g, '')});
        let data = res.data.items.map(s => s && { ...s, title: stripHtmlTags(s.title) });
        data = data.map(item => item && { ...item, checked: false });
        setList(data);
        setLoading(false);

    }

    useEffect(() => {
        getList();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        if (query === "") {
            alert("검색어를 입력하세요")
        } else {
            getList();
        }
    }

    const OnSave = async (shop) => {
        if (window.confirm("상품을 등록하실래요?")) {
            await axios.post("/shop/insert", shop);
            alert("상품 등록완료!")
        }
    }

    // HTML 태그를 제거하는 함수
    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const onChangeAll = (e) => {
        // console.log(e.target.checked);
        const data = list.map(item => item && { ...item, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, pid) => {
        const data = list.map(item => item.productId === pid ? { ...item, checked: e.target.checked } : item);
        setList(data);
    }

    useEffect(() => {
        let chk = 0;
        list.forEach(item => {
            if (item.checked) chk++;
        });
        setCnt(chk);
        // console.log(chk)
    }, [list]);

    const onCheckedSave = async() => {
        if(cnt==0) {
            alert("저장할 상품을 선택하세요");
        }else{
            //선택저장
            if(window.confirm(`${cnt}개 상품을 등록하실래요?`)){
                setLoading(true);
                for(const item of list){
                    if(item.checked){
                        await axios.post("/shop/insert", item);
                    }
                }
                setLoading(false);
                alert("상품등록완료");
                getList();
            }
        }
    }

    if (loading) return <div className='my-5 text-center'><Spinner /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품검색</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e) => setQuery(e.target.value)} placeholder='상품명, 제조사' value={query} />
                            <Button>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end'>
                    <Button onClick={onCheckedSave}>선택저장</Button>
                </Col>
            </Row>
            <Table striped hover>
                <thead>
                    <tr>
                        <td><input type="checkbox" onChange={onChangeAll} checked={list.length===cnt}/></td>
                        <td>ID</td>
                        <td>이미지</td>
                        <td>제목</td>
                        <td>가격</td>
                        <td>제조사</td>
                        <td>등록</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s =>
                        <tr key={s.productId}>
                            <td><input onChange={(e) => onChangeSingle(e, s.productId)} type="checkbox" checked={s.checked} /></td>
                            <td>{s.productId}</td>
                            <td><img src={s.image} width="50" /></td>
                            <td><div className='ellipsis'>{s.title}</div></td>
                            <td>{s.lprice}</td>
                            <td>{s.maker}</td>
                            <td><Button className='btn-sm' onClick={() => OnSave(s)}>등록</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</Button>
                <span className='mx-2'>{page}</span>
                <Button onClick={() => setPage(page + 1)} disabled={page === 10}>다음</Button>
            </div>
        </div>
    )
}

export default SearchPage