import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/productdetail.scss";
import { useSelector } from "react-redux";
import Review from "./Review";

export default function ProductDetailPage() {
  const [product, setProduct] = useState({});
  const [heart, setHeart] = useState(false);
  const { boardId } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const memberId = useSelector((state) => state.auth.memberId);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  useEffect(() => {
    async function getProductDetail() {
      try {
        console.log(`Requested boardId: ${boardId}`);
        const response = await axios.get(
          `http://localhost:8000/product/${boardId}`,
          { params: { isDetailView: true } }
        );

        setProduct(response.data.product);
        console.log(response.data);
        console.log(response.data.product);
      } catch (error) {
        console.error("데이터를 불러오는데 실패하였습니다: ", error);
      }
    }
    getProductDetail();
  }, [boardId]);

  const handleHeartClick = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    setHeart(!heart);

    try {
      const response = await axios.post(
        `http://localhost:8000/product/like/${boardId}`,
        {
          like: !heart,
          memberId: memberId,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("찜 정보를 보내는데 실패하였습니다: ", error);
    }
  };

  return (
    <div className="productDetail">
      <div className="productInfo">
        <div className="productImageContainer">
          <img
            src={`http://localhost:8000/static/userImg/${product.image}`}
            alt={product.title}
            className="productImage"
          />
          <div className="heart" onClick={handleHeartClick}>
            {heart ? "❤️" : "🤍"}
          </div>
        </div>
        <div className="productDescription">
          <div className="productTitle">{product.title}</div>
          <div className="productPrice">
            <p>{product.price}원</p>
          </div>
          <hr />
          {/* 이 상품을 판매하는 판매자 이름도 받아오고싶어요.. 클릭하면 판매자가 파는 물품들 쫘라락 나오게 만들고 싶어요.. */}
          <div className="sellerInfo">판매자: {product.nickname}</div>
          <div>조회수: {product.views}</div>
          <div className="buttonsContainer">
            <button
              className={`commonBtn ${heart ? "heartClicked" : ""}`}
              onClick={handleHeartClick}
            >
              찜하기
            </button>
            <button className="commonBtn">연락하기</button>
          </div>
        </div>
      </div>
      <div className="productContent">
        <p>상품설명 : {product.content}</p>
      </div>
      <hr />
      <Review boardId={boardId} />
    </div>
  );
}
