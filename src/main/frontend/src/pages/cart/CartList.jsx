import React, { useEffect, useState } from 'react'
import styles from './CartList.module.css'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { delCarts, deleteOne1, getCart, updateCnt } from '../../api/cartApi';
import ListTable from '../../components/common/ListTable';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { insertBuy } from '../../api/buyApi';


const CartList = () => {

  const nav = useNavigate();

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
  const total1 = ()=>{
    let total = 0;
    if(isCartNum.length > 0){
      for(let i = 0; i<cartInfo.length; i++){
        if(isCartNum.includes(cartInfo[i].cartNum)){
          total = total + (cartInfo[i].bookList.bookPrice * cartInfo[i].cartCnt)
        }
      }
    }
    return total;
  }

  
  // 10만원 이하 배송시 5000원 추가
  const getDelivery = ()=>{
    const delivery = total1() < 100000 ? 5000 : 0;
    return delivery    
  }

  // 배송비 포함 가격
  const sumAll = ()=>{
    const totalWithDelivery = total1() + getDelivery()
    
    return totalWithDelivery.toLocaleString();
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

//------------------------------------------
  ///// 문제 발생
  // 쿼리 안만들고 BookDetail input 처럼 만들었는데
  // 이러면 DB에 데이터가 들어가지 않음!!!!!!!!
  // 장바구니에서 수량 변경할때마다 DB에 정보가 들어가게 하려면
  // 수정(put) 쿼리 만들어야함!!!!!!

  //   // 수량 변경 + 한글.음수 금지 함수
  // const handleCnt = (e, cartNum)=>{
  //   // 만약 숫자가 아닌 문자열이 입력되면 입력된 문자열을 빈문자열로 변경 (음수 알아서 해결)
  //   let cntValue = e.target.value.replace(/[^0-9]/g,'')
  //   // 빈문자일 경우는 강제로 1로 변경

  //   cntValue = cntValue==='' ? '1' : cntValue;

  //   setCartInfo(cartInfo.map((cart)=>{
  //     return cart.cartNum === cartNum 
  //     ?
  //     {
  //       ...cart
  //       , cartCnt : cntValue
  //     } 
  //     : 
  //     cart
  //   }))
  // }
//------------------------------------




    // 장바구니 수량 변경 함수 + 한글.음수 금지 + 빈문자x 1로 수정
  const updateCartCnt = async (cartNum, cartCnt) => {
    
    // 수량 변경 + 한글.음수 금지 함수
    // 만약 숫자가 아닌 문자열이 입력되면 입력된 문자열을 빈문자열로 변경 (음수 알아서 해결)
    let cntValue = String(cartCnt).replace(/[^0-9]/g,'')
    // 빈문자일 경우는 강제로 1로 변경
    cntValue = cntValue==='' ? '1' : cntValue;
    
    setCartInfo(cartInfo.map(cart=>
      cart.cartNum === cartNum
      ?
      {...cart, 'cartCnt' : cntValue}
      :
      cart
    ))

    await updateCnt(cartNum,cartCnt)
  }

  
  

  // +버튼
  const plusCnt = async (cartNum)=>{
    const newCartInfo = cartInfo.map(cart=>{
      if(cart.cartNum===cartNum){
        const newCnt = Number(cart.cartCnt)+1
        updateCartCnt(cartNum, newCnt)
        return{...cart, cartCnt : newCnt}
      }
      return cart
    })
    setCartInfo(newCartInfo)
  }

  // -버튼
  const minusCnt = async (cartNum)=>{
    const newCartInfo = cartInfo.map(cart => {
      if(cart.cartNum === cartNum) {
        const newCnt = Number(cart.cartCnt) > 1 
          ? Number(cart.cartCnt) - 1 
          : 1
        updateCartCnt(cartNum, newCnt)
        return { ...cart, cartCnt: newCnt }
      }
      return cart
    })
    setCartInfo(newCartInfo)
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

  

  // 장바구니 선택 삭제 함수
  const removeCarts = async ()=>{
    
    // 삭제할 상품을 선택했는지 확인
    if(isCartNum.length===0){
      alert("삭제할 상품이 없습니다. 삭제할 상품을 골라주세요.")
      return;
    }

    // 삭제할 상품의 제목들을 가져오기
    const selectedBooks = cartInfo
      .filter(cart => isCartNum.includes(cart.cartNum))
      .map(cart => cart.bookList.bookTitle)

    // 삭제 여부
    const result = window.confirm(
      `선택한 ${selectedBooks.length}개 상품을 정말 삭제하시겠습니까?\n\n${selectedBooks.join('\n')}`
    )
    
    if(!result) {
      return; 
    }

    await delCarts(isCartNum);  
    // cartApi에 delCarts에 매개변수로 들어감. 매개변수명이 다르지만 헷갈리지말기
    
    alert(`${selectedBooks.length}개 상품이 장바구니에서 삭제되었습니다.`)
    insertCart();
  }
  
  console.log(isCartNum)

  // 장바구니 선택 구매 함수
  const buyCarts = async ()=>{
    // 선택한 상품이 없을 때
    if(isCartNum.length === 0){
      alert('구매할 상품을 선택해주세요.')
      return
    }

    // 선택된 장바구니 항목만 필터링
    const selectedCarts = cartInfo.filter(cart => isCartNum.includes(cart.cartNum))

    // 구매할 도서 목록 제목
    const selectedBooks = selectedCarts.map(cart => cart.bookList.bookTitle)

    const result = window.confirm(
      `선택한 ${selectedCarts.length}개 상품을 구매하시겠습니까?\n\n${selectedBooks.join('\n')}`
    )
    if(!result) return

    // 로그인한 회원 이메일
    const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))

    // 구매 등록 데이터 구성
    const totalPrice = selectedCarts.reduce((sum, cart) => {
      return sum + (cart.bookList.bookPrice * cart.cartCnt)
    }, 0) + getDelivery()

    const data = {
      buyPrice: totalPrice,
      memEmail: loginInfo.memEmail,
      detailList: selectedCarts.map(cart => ({
        bookNum: cart.bookList.bookNum,
        buyCnt: cart.cartCnt
      }))
    }

    // 구매 등록 api 호출
    const response = await insertBuy(data)
    if(response && response.status === 201){
      // 구매 성공 후 장바구니에서 해당 항목 삭제
      await delCarts(isCartNum)
      alert('구매가 완료되었습니다!')
      nav('/my/buyList')
    } else {
      alert('구매 중 오류가 발생했습니다.')
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
            <col width='10%'/>
            <col width='10%'/>
            <col width='22%'/>
            <col width='10%'/>
          </colgroup>
          <thead>
            <tr>
              <td><span>No</span></td>
              <td>
                <input 
                  className={styles.checkbox}
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
                        className={styles.checkbox}
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
                      <span className={styles.titleSpan}>
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
                        onChange={e=>updateCartCnt(cart.cartNum, e.target.value)}
                      />
                      <button 
                        type='button'
                        onClick={()=>minusCnt(cart.cartNum)}
                      >-</button>
                      <button 
                        type='button'
                        onClick={()=>plusCnt(cart.cartNum)}
                      >+</button>
                    </td>



                    <td>
                      <span className={styles.sumSpan}>
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
        <p>
          상품 가격 :  {total1().toLocaleString()}원
        </p>
        <p>
          배송비 : {total1() < 100000 ? '5,000원' : '무료'}
        </p>
        <p>
          총 구매 가격 :  {sumAll()}원
        </p>
      </div>
      <div className={styles.button}>
        <Button
          variant='gray'
          title='선택 삭제'
          onClick={e=>removeCarts()}
        />
        <Button
          title='선택 구매'
          onClick={e=>buyCarts()}
        />
      </div>
    
    
    
    
    </div>
  )
}

export default CartList