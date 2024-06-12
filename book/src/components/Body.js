import { useState } from 'react'
import BestBookList from './BestBookList';
import BookSearch from './BookSearch';
import NewBookList from './NewBookList';
import SmartLibPlace from './SmartLibPlace';

function Body() {
    const secretKey = process.env.REACT_APP_API_DECODING_KEY;
    const [library, setLibrary] = useState('');

    const onSelect = async(e) => {
        setLibrary(e.target.value);
        console.log(library);
    }

    return (
        <div>
            <select className="select select-info w-full max-w-xs" style={{margin:'5px', border:'3px solid #BEEFFF'}} onChange={onSelect} defaultValue=''>
                <option disabled value=''>도서관을 선택해주세요.</option>
                <option value='AA51'>대구2·28기념학생도서관</option>
                <option value='AB35'>대구광역시립두류도서관</option>
                <option value='AD39'>국채보상운동기념도서관(중앙로)</option>
                <option value='AD40'>국채보상운동기념도서관(두류역)</option>
                <option value='AG40'>대구광역시립남부도서관</option>
                <option value='AH17'>대구광역시립동부도서관</option>
                <option value='BA08'>북구 구수산도서관(매천시장)</option>
                <option value='BA22'>북구 구수산도서관(북구청소년회관)</option>
                <option value='BA23'>북구 구수산도서관(대구역)</option>
                <option value='BD10'>수성구립 범어도서관</option>
                <option value='BE18'>수성구립 용학도서관</option>
                <option value='BN13'>서구 원고개도서관</option>
                <option value='BR08'>달성군립도서관</option>
                <option value='BT10'>이천어울림도서관</option>
                <option value='CA08'>동구 안심도서관</option>
                <option value='CB08'>동구 신천도서관(동대구역)</option>
                <option value='CB10'>동구 신천도서관(동구청)</option>
                <option value='FG07'>수성구립 사월역작은도서관</option>
                <option value='FS02'>대구중구영어도서관</option>
            </select>
            <div style={{width : '1200px', textAlign : 'center', margin: '0 auto'}}>
                <div className="collapse collapse-arrow bg-base-200" style = {menuStyle}>
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium" style={{fontWeight : 'bold'}}>
                        위치 안내
                    </div>
                    <div className="collapse-content">
                        <SmartLibPlace library={library} secretKey={secretKey}/>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200" style = {menuStyle}>
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium" style={{fontWeight : 'bold'}}>
                        2024년 인기대출 도서 TOP 100
                    </div>
                    <div className="collapse-content">
                        <BestBookList library={library} secretKey={secretKey}/>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200" style = {menuStyle}>
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium" style={{fontWeight : 'bold'}}>
                        소장 도서 검색
                    </div>
                    <div className="collapse-content">
                        <BookSearch library={library} secretKey={secretKey}/>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200" style = {menuStyle}>
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium" style={{fontWeight : 'bold'}}>
                        2024년 신작 도서
                    </div>
                    <div className="collapse-content">
                        <NewBookList library={library} secretKey={secretKey}/>
                    </div>
                </div>
            </div>
            <div>
                * API 제공 서버에 문제가 있어 응답이 느립니다. 책 리스트가 늦게 표시될 수 있습니다. 5~10초 정도 기다려주십시오.
            </div>
        </div>
    );
}

const menuStyle = {
    backgroundColor : '#BEEFFF',
    margin : '5px',
}

export default Body;
