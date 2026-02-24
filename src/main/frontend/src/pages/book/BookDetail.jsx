import React, { useEffect, useState } from 'react'
import styles from './BookDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getBookDetail } from '../../api/bookApi';
import Input from '../../components/common/Input';
import { click } from '../../api/loginApi';
import { regCart } from '../../api/cartApi';


const BookDetail = ({book}) => {

  const nav = useNavigate();

  // 상세보기하려는 도서 번호 구조분해할당
  const {bookNum} = useParams();

  // 조회한 상세 정보 저장 state 변수
  const [bookDetail, setBookDetail] = useState({
    bookImgList:[]
    
  });


  //마운트시 도서 상세 조회
  useEffect(()=>{
    getDetail();
  },[])

  // 도서 상세 조회 함수
  const getDetail = async()=>{
    const response = await getBookDetail(bookNum);
    setBookDetail(response.data)
  } 
  

  console.log("bookDetail.bookImgList : "+ bookDetail.bookImgList)
  console.log(`http://localhost:8080/upload/${bookDetail.bookImgList?.[0]?.uploadFileName}`)


  // 수량 초기값 1, 변경가능
  const [bookCnt, setBookCnt] = useState(1);

  // 총 가격 (수랑*가격)
  const sum = ()=>{
    return (bookCnt*bookDetail.bookPrice)?.toLocaleString();
  }

  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
  console.log('로그인인포'+loginInfo)
  // 장바구니 버튼 누르면
  const clickCart = ()=>{
    // 로그인 여부 확인 confirm
    if(loginInfo === null){
      const isLogin = window.confirm("로그인이 필요합니다.\n \t 로그인 하시겠습니까?")
      if(isLogin){
        nav('/login')
      } 
      return;
    } 

    // 장바구니 등록 api 조회
    insertCart();

  }

  // 장바구니 등록 함수
  const insertCart = async()=>{

    const loginInfo = sessionStorage.getItem('loginInfo')
    const loginInfo_obj = JSON.parse(loginInfo);

    const data = {
      bookNum : bookDetail.bookNum
      , cartCnt : bookCnt
      , memEmail : loginInfo_obj.memEmail
    }
    const response = await regCart(data);
    if(response.status===201){
      const result = window.confirm('해당 상품을 장바구니에 상품을 담았습니다. \n \t 장바구니로 이동하시겠습니까?');
      if(result){
        nav('/my/cartList')
      }
    } else{
      alert('axios 함수 조회 중 오류 발생')
    }
  }


  
  // 수량 변경 + 한글.음수 금지 함수
  const handleCnt = (e)=>{
    // 만약 숫자가 아닌 문자열이 입력되면 입력된 문자열을 빈문자열로 변경 (음수 알아서 해결)
    let cntValue = e.target.value.replace(/[^0-9]/g,'')
    // 빈문자일 경우는 강제로 1로 변경

    cntValue = cntValue==='' ? '1' : cntValue;

    setBookCnt(cntValue);
  }
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.imgdiv}>
            {

              bookDetail.bookImgList && 
              // bookDetail.bookImgList.map((e,i)=>{
              //   if(e.isMain === 'Y'){
              //     return(
              //       <img 
              //         key={i}
              //         src={`http://localhost:8080/upload/${e.uploadFileName}`}
              //       />
              //     )
              //   }
              // })

              <img 
                src={
                  `http://localhost:8080/upload/${bookDetail.bookImgList.filter((e)=>{
                    return e.isMain==='Y'
                  })[0]?.uploadFileName}`
                }
              />

            }
            
            
          </div>
          <div className={styles.bookInfo}>
            <p>제목 : {bookDetail.bookTitle}</p>
            <p>저자 : {bookDetail.author}</p>
            <p>가격 : {bookDetail.bookPrice?.toLocaleString()}원</p>
            <div className={styles.cnt}>
              <p>
                수량 :  
                <Input
                  name='bookCnt'
                  type='text'
                  value={bookCnt}
                  placeholder = '수량을 입력하세요.'
                  onChange={e=>handleCnt(e)}
                />
              </p>
              <button 
                type='button'
                onClick={e=>{
                  setBookCnt(e=>Number(e)+1)
                }}
              >+</button>
              <button 
                type='button'
                onClick={e=>{
                  setBookCnt(e=>
                    Number(e)>1?Number(e)-1 : 1
                  )
                }}
              >-</button>
            </div>
            <p>총 구매 가격 : {sum()}원</p>
            <div>
              <button 
                className={styles.btnCart}
                type='button'
                onClick={e=>{
                  clickCart(e)
                }}
              >장바구니에 담기</button>
              <button 
                type='button'
                className={styles.btnGumae}
              >바로 구매</button>
            </div>
          </div>
        </div>
        <p className={styles.bookIntro}>도서소개 : {bookDetail.bookIntro}</p>
        {
              bookDetail.bookImgList && 
              bookDetail.bookImgList.map((e,i)=>{
                if(e.isMain === 'N'){
                  return(
                    <img 
                      key={i}
                      className={styles.imgDetail}
                      src={`http://localhost:8080/upload/${e.uploadFileName}`}
                    />
                  )
                }
              })
            }
      </div>
    
    
    </>
  )
}

export default BookDetail