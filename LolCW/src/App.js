import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [championData, setChampionData] = useState([]); // 챔피언 데이터 리스트
  const [leftChampions, setLeftChampions] = useState([]); // 왼쪽 칸의 챔피언
  const [rightChampions, setRightChampions] = useState([]); // 오른쪽 칸의 챔피언
  useEffect(() => getData(), []);
  const getData = async () => {
    await axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/14.23.1/data/ko_KR/champion.json"
      )
      .then(response => {
        const championsData = response.data.data;

        // 챔피언 이름과 이미지 데이터 추출
        const formattedData = Object.values(championsData).map(champion => ({
          name: champion.name,
          image: champion.image.full,
        }));
        setChampionData(formattedData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 랜덤 챔피언 10개 선택 함수
  const getRandomChampions = (list) => {
    const shuffled = [...list].sort(() => 0.5 - Math.random()); // 리스트를 섞음
    return shuffled.slice(0, 10); // 상위 10개 반환
  };

  // 좌우 칸에 랜덤 챔피언 5개씩 업데이트
  const updateRandomChampions = () => {
    const randomChampions = getRandomChampions(championData);
    const left = randomChampions.slice(0, 5);
    const right = randomChampions.slice(5, 10);
    setLeftChampions(left);
    setRightChampions(right);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* 데이터 배치 버튼 */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={updateRandomChampions}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          랜덤 배치
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        {/* 왼쪽 정사각형 칸 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '150px',
            height: '80%',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          {leftChampions.map((champion, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${champion.image}`}
                alt={champion.name}
                style={{ width: '50px', height: '50px', borderRadius: '8px' }}
              />
              <p style={{ fontSize: '12px' }}>{champion.name}</p>
            </div>
          ))}
        </div>

        {/* 중앙 챔피언 나열 (스크롤 가능) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            width: '60%',
            height: '80%',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          {championData.length > 0 ? (
            championData.map((champion, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  width: '100px',
                }}
              >
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${champion.image}`}
                  alt={champion.name}
                  style={{ width: '80px', height: '80px', borderRadius: '8px' }}
                />
                <p style={{ fontSize: '14px' }}>{champion.name}</p>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '18px', color: '#777' }}>검색 결과가 없습니다</p>
          )}
        </div>

        {/* 오른쪽 정사각형 칸 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '150px',
            height: '80%',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          {rightChampions.map((champion, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${champion.image}`}
                alt={champion.name}
                style={{ width: '50px', height: '50px', borderRadius: '8px' }}
              />
              <p style={{ fontSize: '12px' }}>{champion.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
