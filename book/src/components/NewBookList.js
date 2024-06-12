import { useState, useEffect } from 'react';
import axios from 'axios';

function NewBookList({ library, secretKey }) {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        if (library) {
            axios.get(
                "https://apis.data.go.kr/6270000/dgsmartlib/newBookList?" + 
                "serviceKey=" + secretKey +
                "&pageNo=1" + 
                "&numOfRows=100" +
                "&code=" + library + 
                "&shelf_change_start_date=2024-01-01" + 
                "&shelf_change_end_date=2024-12-31"
            ).then(response => {
                setBookList(response.data.response.body.items.item);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [library]);

    return (
        <div>
            {library === '' ? (
                '도서관을 선택해주세요'
            ) : (
                <div className="overflow-x-auto">
                    <p>* 최대 100개의 결과만 표시됩니다.</p>
                    <table className="table" style={{fontSize:'12px'}}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>제목</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>비치일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, index) =>
                                <tr key={book.BOOK_KEY || index}>
                                    <th>{book.RNUM}</th>
                                    <td>{book.TITLE_INFO}</td>
                                    <td>{book.AUTHOR}</td>
                                    <td>{book.PUBLISHER}</td>
                                    <td>{book.REG_DATE}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default NewBookList;
