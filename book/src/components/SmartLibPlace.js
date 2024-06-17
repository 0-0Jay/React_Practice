import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function SmartLibPlace({ library, secretKey }) {
    const [data, setData] = useState([]);
    const mapRef = useRef();

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
    }, [library, secretKey]);

    useEffect(() => {
        const { naver } = window;
        if (mapRef.current && naver) {
            const location = new naver.maps.LatLng(data.LATITUDE, data.LONGITUDE);
            const map = new naver.maps.Map(mapRef.current, {
                center: location,
                zoom: 17,
            });
            new naver.maps.Marker({
                position: location,
                map,
            });
        }
    }, [data]);

    return (
        <div>
            {library === '' ? (
                '도서관을 선택해주세요'
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div ref={mapRef} style={mapStyle}></div>
                    </div>
                    <div>상세위치 : {data.LOCATION}</div>
                </div>
            )}
        </div>
    );
}

const mapStyle = {
    width: "500px",
    height: "500px",
}

export default SmartLibPlace;
