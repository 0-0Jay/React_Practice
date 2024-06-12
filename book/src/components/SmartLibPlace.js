import { useState, useEffect } from 'react';
import axios from 'axios';

function SmartLibPlace({library, secretKey}) {
    const[data, setData] = useState([]);

    useEffect(() => {
        if (library) {
            axios.get(
                "https://apis.data.go.kr/6270000/dgsmartlib/smartLibPlace?" + 
                "serviceKey=" + secretKey +
                "&code=" + library
            ).then(response => {
                setData(response.data.response.body.items.item[0]);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [library]);

    return (
        <div>
            {library === '' ?(
                '도서관을 선택해주세요'
            ):(
                <div>
                    <p>위도 : {data.LATITUDE}</p>
                    <p>경도 : {data.LONGITUDE}</p>
                    <p>상세위치 : {data.LOCATION}</p>
                </div>
            )}
        </div>
    );
}

export default SmartLibPlace;
