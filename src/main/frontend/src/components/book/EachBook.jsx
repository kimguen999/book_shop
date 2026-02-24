import React, { useState } from 'react'
import styles from './EachBook.module.css'
import BookList from '../../pages/book/BookList'
import { getBookDetail } from '../../api/bookApi';
import { useNavigate } from 'react-router-dom';

const EachBook = ({book}) => {

  const nav = useNavigate();

  const [bookDetail, setBookDetail] = useState();

  console.log("bookDetail : "+bookDetail);

  // 천단위 구분기호
  const money = 10000000;
  // console.log(money.toLocaleString())


  // 상세보기 클릭시 상세보기로 이동
  const clickDetail = ()=>{
    nav(`/bookDetail/${book.bookNum}`)
  }

  


  return (
    <>
      <div className={styles.container}>
        <div 
          className={styles.imgdiv}
          onClick={e=>{clickDetail(e)}}
          
        >
          <img 
            
            // src={book.bookImgList[0].uploadFileName}
            src={`http://localhost:8080/upload/${book.bookImgList[0].uploadFileName}`}
            // src="src/image/bookshopimg/부동산상식/부동상 상식사전_메인.jpg"
            
          />
          <div 
            className={styles.black}
            
          ></div>
          <div className={styles.lable}>
            <p>상세보기</p>
          </div>
        </div>



        <div className={styles.p}>
          <p>도서명 : {book.bookTitle}</p>
          <p>가격 : {book.bookPrice.toLocaleString()}원</p>
        </div>
      </div>
    </>
  )
}

export default EachBook