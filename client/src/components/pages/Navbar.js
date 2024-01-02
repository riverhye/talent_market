import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/navbar.scss";

export default function NavBar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHamburgerClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleSearchTermChange = (event) => {
    setSearchTermLocal(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/?search=${searchTermLocal}`
        // 이게 주소가 이게 맞나... 모르겠네요
      );
      setSearchResults(response.data);
      navigate(`/?search=${searchTermLocal}`);
      setSearchTermLocal("");
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  useEffect(() => {
    if (!location.search) {
      setSearchResults([]);
    }
  }, [location.search]);

  return (
    <>
      {isCategoryOpen && (
        <div className="dimmedBackground" onClick={handleHamburgerClick}></div>
      )}
      <div className="navBar">
        {/* 햄버거 버튼 */}
        <button className="hamburgerButton" onClick={handleHamburgerClick}>
          ☰
        </button>

        {/* 카테고리 창 */}
        {isCategoryOpen && (
          <div className={`categoryWindow ${isCategoryOpen ? "open" : ""}`}>
            <div>성대모사</div>
            <div>코디</div>
            <div>그림</div>
            <div>사주 / 타로</div>
            <div>연애상담</div>
            <div>악기</div>
            <div>노래</div>
          </div>
        )}

        {/* 페이지 이름 부분 */}
        <h2 className="pageTitle">
          <Link to="/">재능마켓🏞️</Link>
        </h2>

        {/* 검색창과 검색 버튼 */}
        <div className="searchSection">
          <input
            type="text"
            className="searchInput"
            placeholder="검색어를 입력하세요"
            value={searchTermLocal}
            onChange={handleSearchTermChange}
            onKeyPress={handleOnKeyPress}
          />
          <button className="searchButton" onClick={handleSearchButtonClick}>
            검색
          </button>
        </div>

        {/* 검색 결과 보여주기 */}
        {searchResults.map((product) => (
          <div key={product.boardId}>
            <div className="imgContainer">
              <img
                src={`http://localhost:8000/static/userImg/${product.image}`}
                alt={product.title}
              />
            </div>
            <h4>{product.title}</h4>
            <p>{product.price}원</p>
            <p>{product.rating}</p>
          </div>
        ))}

        {/* 로그인 버튼 */}
        <button className="loginButton">
          <Link to="/member/signin">로그인</Link>
        </button>
      </div>
    </>
  );
}
