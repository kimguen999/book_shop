import React, { useEffect, useState } from 'react'
import styles from './BookDetail.module.css'

const BookDetail = () => {

  // 조회한 상세 정보 저장 state 변수
  const [bookDetail, setBookDetail] = useState({
    bookTitle : ''
    , author : ''
    , bookPrice : ''
    , bookStock : ''
    , bookIntro : ''
  });

  // 마운트시 도서 상세 조회
  useEffect(()=>{
    getDetail();
  },[])

  // 도서 상세 조회 함수
  const getDetail = async()=>{
    const reponse = await getBookDetail();
    setBookDetail(reponse.data)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.imgdiv}>
            <img src="src/image/bookshopimg/부동산상식/부동상 상식사전_메인.jpg"/>
          </div>
          <div className={styles.bookInfo}>
            <p>제목 : {bookDetail.bookTitle}</p>
            <p>저자 : {bookDetail.author}</p>
            <p>가격 : {bookDetail.bookPrice}원</p>
            <p>수량 : {bookDetail.bookStock}</p>
            <p>총 구매 가격 : </p>
            <div>
              <button type='button'>장바구니에 담기</button>
              <button type='button'>바로 구매</button>
            </div>
          </div>
        </div>
        <p className={styles.bookIntro}>도서소개 : {bookDetail.bookIntro}</p>
        <img 
          className={styles.imgDetail}
          src='src/image/bookshopimg/부동산상식/부동상 상식사전_상세1.jpg'
        />
      </div>
    
    
    </>
  )
}

export default BookDetail