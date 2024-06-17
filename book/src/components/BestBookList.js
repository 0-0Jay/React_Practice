import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BestBookList({ library, secretKey }) {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        if (library) {
            axios.get(
                "https://apis.data.go.kr/6270000/dgsmartlib/bestBookList?" + 
                "serviceKey=" + secretKey +
                "&pageNo=1" + 
                "&numOfRows=10" +
                "&code=" + library + 
                "&search_start_date=2024-01-01" +
                "&search_end_date=2024-12-31"
            ).then(response => {
                console.log(response)
                if (response.data.response.header.resultCode === "S001") {
                    setBookList(response.data.response.body.items.item);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }, [library, secretKey]);

    return (
        <div>
            {library === '' ? (
                '도서관을 선택해주세요'
            ) : (
                <div className="overflow-x-auto">
                    <table className="table" style={{fontSize:'12px'}}>
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>유형</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>출판연도</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, index) =>
                                <tr key={book.BOOK_KEY || index}>
                                    <th>{book.RANK}</th>
                                    <td>{book.BOOK_TYPE}</td>
                                    <td>{book.TITLE}</td>
                                    <td>{book.AUTHOR}</td>
                                    <td>{book.PUBLISHER}</td>
                                    <td>{book.PUBLISH_YEAR}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default BestBookList;
