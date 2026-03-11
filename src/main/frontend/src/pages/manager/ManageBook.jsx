import React, { useState } from 'react'
import styles from './ManageBook.module.css'


const ManageBook = () => {

  // 오늘, 이달 주문건수 및 매출액 정보 저장 state 변수
  const [saleInfo, setSaleInfo] = useState({});


  // top 5 구매자 정보 저장 state 변수
  const [topBuyer, setTopBuyer] = useState([]);


  // top 5 도서 정보 저장 state 변수
  const [topBook, setTopBook] = useState([]);

  
  // 최근 10일간 매출 정보 저장 state 변수
  const [saleTen, setSaleTen] = useState([]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.head2}>
            <div className={styles.head3}>
              <div>
                <p>오늘의 주문건수</p>
                <p>13</p>
              </div>
              <div>
                <p>이달의 매출금액</p>
                <p>1,500,000</p>
                
              </div>
            </div>
            <div>
              <div>
                <p>오늘의 매출금액</p>
                <p>500,000</p>
              </div>
              <div>
                <p>이달의 주문건수</p>
                <p>56</p>
              </div>
            </div>
          </div>
          <div>
            주간 매출 그래프
          </div>
        </div>


        <div className={styles.tail}>
          <div>
            <p>구매랭킹(상위5명)</p>
            테이블
          </div>
          <div>
            <p>인기 도서 랭킹(상위5권)</p>
            테이블
          </div>
        </div>
      </div>
    

    
    
    </>
  )
}


export default ManageBook