import React from 'react'
import styles from './EachBook.module.css'
import BookList from '../../pages/book/BookList'

const EachBook = ({book}) => {

  // 천단위 구분기호
  const money = 10000000;
  console.log(money.toLocaleString())

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgdiv}>
          <img 
            src="src/image/bookshopimg/부동산상식/부동상 상식사전_메인.jpg"
            
          />
          <div className={styles.black}></div>
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