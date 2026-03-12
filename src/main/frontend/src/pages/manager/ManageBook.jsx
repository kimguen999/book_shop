import React, { useEffect, useState } from 'react'
import styles from './ManageBook.module.css'
import { dashboard_1, dashboard_2, dashboard_3, dashboard_4 } from '../../api/buyApi';
import TestBarChart from '../../components/buy/TestBarChart';


const ManageBook = () => {

  // 오늘, 이달 주문건수 및 매출액 정보 저장 state 변수
  const [saleInfo, setSaleInfo] = useState({});


  // top 5 구매자 정보 저장 state 변수
  const [topBuyer, setTopBuyer] = useState([]);


  // top 5 도서 정보 저장 state 변수
  const [topBook, setTopBook] = useState([]);

  
  // 최근 10일간 매출 정보 저장 state 변수
  const [saleTen, setSaleTen] = useState([]);


  // 마운트시 모든 데이터 조회
  useEffect(()=>{
    getAllData();
  },[])

  // 모든 데이터를 조회하는 함수
  const getAllData = async ()=>{
    // 다수의 api를 한번에 조회
    const [response1, response2, response3, response4] = await Promise.all([
      dashboard_1()
      , dashboard_2()
      , dashboard_3()
      , dashboard_4()
    ])
    // 조회한 데이터 변수에 저장
    setSaleInfo(response1.data);
    setTopBuyer(response2.data);
    setTopBook(response3.data);
    setSaleTen(response4.data);
    console.log('1번 데이터',response1.data)
    console.log('2번 데이터',response2.data)
    console.log('3번 데이터',response3.data)
    console.log('4번 데이터',response4.data)
  }




  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.head2}>
            <div className={styles.head3_1}>
              <div>
                <p>오늘의 주문건수</p>
                <p>13</p>
              </div>
              <div>
                <p>이달의 매출금액</p>
                <p>1,500,000</p>
                
              </div>
            </div>
            <div className={styles.head3_2}>
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
          <div className={styles.chart}>
            
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
      <TestBarChart 
        chartData={saleTen}
      />
    
    
    </>
  )
}


export default ManageBook