import React, { useEffect, useState } from 'react'
import styles from './CartList.module.css'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { deleteOne1, getCart } from '../../api/cartApi';
import ListTable from '../../components/common/ListTable';
import dayjs from 'dayjs';


const CartList = () => {

  // 조회한 장바구니 목록 저장 state 변수
  const [cartInfo, setCartInfo] = useState([]);

  

  // 마운트시 장바구니 조회 api
  useEffect(()=>{
    insertCart();
  },[])


  // 장바구니 조회 axios 함수 호출
  const insertCart = async()=>{
    // 로그인한 회원 아이디 
    const loginInfo = sessionStorage.getItem('loginInfo');
    const loginInfo_obj = JSON.parse(loginInfo);

    const response = await getCart(loginInfo_obj.memEmail)
    setCartInfo(response.data)

    setIsCartNum(response.data.map(cart=>cart.cartNum));
    setIsChecked(true);


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
    if(isCartNum.length > 0){
      for(let i = 0; i<cartInfo.length; i++){
        if(isCartNum.includes(cartInfo[i].cartNum)){
          total = total + (cartInfo[i].bookList.bookPrice * cartInfo[i].cartCnt)
        }
      }
    }
    
    return total.toLocaleString();
  }

  
  

  // 장바구니 개별 삭제 버튼 클릭시 삭제 axios 함수 호출
  const deleteOne = async (cartNum, bookTitle)=>{
    const result = window.confirm(`선택하신 상품 \n ${bookTitle}을 삭제하시겠습니까?`)
    if(result!==true){
      return;
    }
    const response = await deleteOne1(cartNum);
    if(response.status===200){
      alert(`선택하신 상품 \n ${bookTitle}이 삭제되었습니다.`)
      insertCart()
    }
  }

    // 수량 변경 + 한글.음수 금지 함수
  const handleCnt = (e, cartNum)=>{
    // 만약 숫자가 아닌 문자열이 입력되면 입력된 문자열을 빈문자열로 변경 (음수 알아서 해결)
    let cntValue = e.target.value.replace(/[^0-9]/g,'')
    // 빈문자일 경우는 강제로 1로 변경

    cntValue = cntValue==='' ? '1' : cntValue;

    setCartInfo(cartInfo.map((cart)=>{
      return cart.cartNum === cartNum 
      ?
      {
        ...cart
        , cartCnt : cntValue
      } 
      : 
      cart
    }))
  }

  // +버튼
  const plusCnt = (cartNum)=>{
    setCartInfo(cartInfo.map(cart=>{
      return cart.cartNum === cartNum 
      ? 
      {
        ...cart
        , cartCnt : Number(cart.cartCnt)+1
      } 
      : 
      cart
    }))
  }
  // -버튼
  const minusCnt = (cartNum)=>{
    setCartInfo(cartInfo.map(cart=>{
      return cart.cartNum === cartNum 
      ? 
      {
        ...cart
        , cartCnt : 
          Number(cart.cartCnt)>1
          ?
          Number(cart.cartCnt)-1
          :
          1
      } 
      : 
      cart
    }))
  }
  // 전체 체크박스 체크 변경 state 변수
  const [isChecked, setIsChecked] = useState(true);

  // cartNum만 저장할 state 변수
  const [isCartNum, setIsCartNum] = useState([])


  // 체크박스 변경시 실행함수
  const handleCheckbox = (e, cartNum)=>{
    if(e.target.checked){
      // e.target.checked 됐을때 true 반환
      setIsCartNum([...isCartNum, cartNum])
    }
    // 체크 해제시
    else{
      // filter()로 원하는 값만 걸러서 배열로 리턴
      // 잘 모르겠으면 study에 CheckboxTest.jsx 참고
      setIsCartNum(isCartNum.filter(each=>each!==cartNum));
      // 체크 하나라도 해제시 thead 체크박스 해제
      setIsChecked(false)

      // filter(e=>{return 참or거짓})  거짓인거는 걸러지는 filter
      // map(e=>{return 계산식})
      // ex) arr = [1,2,3]
      //     arr.filter(e=>{return e>1})  -> [2, 3]
      //     arr.map(e=>{return e+1})   -> ['2','3','4',]
      
    }
  }

  
  const headCheckbox = (e)=>{
    // 전체 체크박스 컨트롤
    setIsChecked(e.target.checked)
    // 내용부 체크박스 컨트롤
    if(e.target.checked){
      setIsCartNum(cartInfo.map(cart => cart.cartNum));
    } else{
      setIsCartNum([]);
    }
  }

  //---------------------------------------------------------------------

  return (
    <div className={styles.container}>
      <div>
        
        <ListTable className={styles.table}>
          <colgroup>
            <col width='3%'/>
            <col width='3%'/>
            <col width='*'/>
            <col width='7%'/>
            <col width='8%'/>
            <col width='8%'/>
            <col width='22%'/>
            <col width='10%'/>
          </colgroup>
          <thead>
            <tr>
              <td><span>No</span></td>
              <td>
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={e=>headCheckbox(e)}
                />
              </td>
              <td><span>도서 정보</span></td>
              <td><span>가격</span></td>
              <td className={styles.cntTd}><span>수량</span></td>
              <td><span>구매 가격</span></td>
              <td><span>장바구니 등록 일자</span></td>
              <td><span>삭제</span></td>
            </tr>
          </thead>
          <tbody>
            {
              cartInfo.length===0
              ?
              <tr><td colSpan={8}>장바구니에 담긴 상품이 없습니다.</td></tr>
              :
              cartInfo.map((cart,i)=>{
                return(
                  <tr key={i}>
                    <td>
                      <span>
                        {i+1}
                      </span>
                    </td>



                    <td>
                      <input 
                        type="checkbox" 
                        checked={isCartNum.includes(cart.cartNum)}
                        value={cart.cartNum}
                        onChange={e=>handleCheckbox(e,cart.cartNum)}
                      />
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
                    <td className={styles.cntTd}>
                      <Input 
                        value={cart.cartCnt}
                        onChange={e=>handleCnt(e, cart.cartNum)}
                      />
                      <button 
                        type='button'
                        onClick={()=>{plusCnt(cart.cartNum)}}
                      >+</button>
                      <button 
                        type='button'
                        onClick={()=>{minusCnt(cart.cartNum)}}
                      >-</button>
                    </td>
                    <td>
                      <span>
                        {sum(cart)}
                      </span>
                    </td>
                    <td>
                      <span>
                        {/* {cart.cartDate} */}
                        {dayjs(cart.cartDate).format(`YYYY년 M월 D일 H시 m분`)}
                      </span>
                    </td>
                    <td>
                      <Button
                        type='button'
                        title='삭제'
                        variant='green'
                        onClick={()=>deleteOne(cart.cartNum, cart.bookList.bookTitle)}
                      />
                    </td>
                  </tr>

                )
              })}
            
            
            
          </tbody>
        </ListTable>
      </div>
      <div className={styles.price}>
        <span>
          총 구매 가격 : {sumAll()} 원
        </span>
      </div>
      <div className={styles.button}>
        <Button
          variant='gray'
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