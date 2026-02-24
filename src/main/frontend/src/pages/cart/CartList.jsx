import React, { useEffect, useState } from 'react'
import styles from './CartList.module.css'
import Button from '../../components/common/Button'
import { getCart } from '../../api/cartApi';


const CartList = () => {

  // 조회한 장바구니 목록 저장 state 변수
  const [cartInfo, setCartInfo] = useState([]);

  

  // 마운트시 장바구니 조회 api
  useEffect(()=>{
    insertCart();
  },[])


  // 장바구니 조회 axios 함수 호출
  const insertCart = async()=>{
    const loginInfo = sessionStorage.getItem('loginInfo');
    const loginInfo_obj = JSON.parse(loginInfo);

    const response = await getCart(loginInfo_obj.memEmail)
    setCartInfo(response.data)
    return response;

  }
  
  // 구매가격 (가격*수량)
  const sum = (cart)=>{
    return (
      Number(cart.bookList.bookPrice)*Number(cart.cartCnt)
    )?.toLocaleString()
  }
  
  // 총 구매가격 (구매가격 다더한거)
  const sumAll = (sum)=>{
    let total = 0;
    for(let i = 0; i<cartInfo.length; i++){
      total = total + (cartInfo[i].bookList.bookPrice * cartInfo[i].cartCnt)
    }
    return total.toLocaleString();
  }

  console.log(cartInfo)




  return (
    <div className={styles.container}>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td><span>No</span></td>
              <td>
                <input type="checkbox" />
              </td>
              <td><span>도서 정보</span></td>
              <td><span>가격</span></td>
              <td><span>수량</span></td>
              <td><span>구매 가격</span></td>
              <td><span>장바구니 등록 일자</span></td>
              <td><span>삭제</span></td>
            </tr>
          </thead>
          <tbody>
            {cartInfo.map((cart,i)=>{
              return(
                <tr key={i}>
                  <td>
                    <span>
                      {i+1}
                    </span>
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.imgtd}>
                    <img 
                      src={`http://localhost:8080/upload/${cart.bookList.bookImgList[0].uploadFileName}`}
                      className={styles.img}
                    />
                    <span>
                      {cart.bookList.bookTitle}
                    </span>
                  </td>
                  <td>
                    <span>
                      {cart.bookList.bookPrice?.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span>
                      {cart.cartCnt}
                    </span>
                  </td>
                  <td>
                    <span>
                      {sum(cart)}
                    </span>
                  </td>
                  <td>
                    <span>
                      {cart.cartDate}
                    </span>
                  </td>
                  <td>
                    <button type='button'>삭제</button>
                  </td>
                </tr>

              )
            })}
            
           
          </tbody>
        </table>
      </div>
      <div className={styles.price}>
        <span>
          총 구매 가격 : {sumAll()} 원
        </span>
      </div>
      <div className={styles.button}>
        <Button
          variant='green'
          title='선택 삭제'
        />
        <Button
          title='선택 구매'
        />
      </div>
    
    
    
    
    </div>
  )
}

export default CartList