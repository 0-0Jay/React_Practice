import { useState, useEffect } from 'react';
import axios from 'axios';

function BookSearch({ library, secretKey }) {
    const pages = Array.from({ length: 10 }, (_, i) => i + 1);
    const [searchtext, setSearchtext] = useState('');
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        setSearchtext('');
        setBookList([]);
    }, [library]);

    const keyword = (e) => {
        setSearchtext(e.target.value);
    }

    const onSearch = async(e) => {
        if (library) {
            axios.get(
                "https://apis.data.go.kr/6270000/dgsmartlib/bookSearch?" + 
                "serviceKey=" + secretKey +
                "&pageNo=1" + 
                "&numOfRows=100" +
                "&code=" + library + 
                "&search_text=" + searchtext
            ).then(response => {
                console.log(searchtext);
                console.log(response);
                setBookList(response.data.response.body.items.item);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div>
            {library === '' ? (
                '도서관을 선택해주세요'
            ) : (
                <div className="overflow-x-auto">
                    <label className="input input-bordered flex items-center gap-2" style={{width:'500px', margin:'0 auto'}}>
                        <input type="text" className="grow" placeholder="검색어를 입력하세요" onChange={keyword}/>
                        <button onClick={onSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </button>
                    </label>
                    <p>최대 100개의 검색결과만 출력됩니다.</p>
                    <table className="table" style={{ fontSize: '12px' }}>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>출판연도</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map((book, index) => (
                                <tr key={book.BOOK_KEY || index}>
                                    <th>{book.RNUM}</th>
                                    <td>{book.TITLE_INFO}</td>
                                    <td>{book.AUTHOR}</td>
                                    <td>{book.PUBLISHER}</td>
                                    <td>{book.PUB_YEAR}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                </div>
            )}
        </div>
    );
}

const buttonStyle = {
    fontSize: '10px',
    margin: '0px',
    backgroundColor: '#BEEFFF',
    border: '0px'
}

export default BookSearch;
