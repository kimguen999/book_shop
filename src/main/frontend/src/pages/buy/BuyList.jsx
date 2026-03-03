import React from 'react'
import styles from './BuyList.module.css'


const BuyList = () => {

  


  return (
    <>
    
      <div className={styles.container}>
        <p>
          책 타이틀 외 ?개    가격    날짜
        </p>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <td>No</td>
              <td>도서정보</td>
              <td>가격</td>
              <td>수량</td>
              <td>구매가격</td>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr>
              <td>1</td>
              <td>이미지+도서명</td>
              <td>30000원</td>
              <td>2</td>
              <td>30000*2</td>
            </tr>
          </tbody>

        </table>
      </div>
    
    
    
    
    </>
  )
}

export default BuyList