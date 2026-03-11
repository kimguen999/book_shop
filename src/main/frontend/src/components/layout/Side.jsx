import React from 'react'
import styles from './Side.module.css'
import { 
  FaChartColumn, FaSquarePlus, FaCubesStacked, 
  FaFileArrowUp
} from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Side = () => {

  const nav = useNavigate()

  const goCart = ()=>{
    nav('/my/cartList')
  }

  const goBuyList = ()=>{
    nav('/my/buyList')
  }


  return (
    <>
      <div className={styles.container}>
        <h5>마이페이지</h5>
        <ul>
          <li
            onClick={e=>{
              goCart();
            }}
          >
            <FaChartColumn className={styles.icon}/>
            <p>장바구니</p>
          </li>
          <li
            onClick={e=>{
              goBuyList();
            }}
          >
            <FaSquarePlus className={styles.icon}/>
            <p>구매내역</p>
          </li>
          <li>
            <FaCubesStacked className={styles.icon}/>
            <p>내정보수정</p>
          </li>
        </ul>
      </div>
    
    
    
    </>
  )
}

export default Side