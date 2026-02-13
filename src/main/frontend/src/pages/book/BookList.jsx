import React, { useEffect, useState } from 'react'
import EachBook from '../../components/book/EachBook'
import styles from './BookList.module.css'
import { getBookList } from '../../api/bookApi';

const BookList = () => {

  // 조회한 도서 목록 데이터를 저장할 state변수
  const [bookList, setBookList] = useState([]);
  
  // 마운트시 도서 목록 조회
  useEffect(()=>{
    getList();
  },[])

  // 도서 목록 조회 함수
  const getList = async()=>{
    const response = await getBookList();
    setBookList(response.data)
  }


  return (
    <>
      <div className={styles.container}>
        {
          bookList.map((book,i)=>{
            return(
              <EachBook
                key={i}
                book={book}
              />
            )
          })
        }

      </div>
    
    
    </>
  )
}

export default BookList