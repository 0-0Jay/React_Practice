function Header() {
  return (
    <div className="navbar bg-base-300" style={{textAlign:"center", backgroundColor:'#FFF'}}>
      <button className="btn btn-ghost text-xl" style={headerStyle}>스마트 도서관 조회 서비스</button>
    </div>
  );
}

const headerStyle = {
  margin:'10px auto', 
  fontSize:'30px',
  padding: '10px'
}

export default Header;