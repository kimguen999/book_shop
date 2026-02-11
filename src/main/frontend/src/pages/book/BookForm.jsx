import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import axios from 'axios';
import { regButton1 } from '../../api/bookApi';
import { getCateList } from '../../api/bookCateApi';

const BookForm = () => {

  // 조회한 카테고리 목록 데이터를 저장할 state 변수
  const [cateList, setCateList] = useState([]);

  // 유효성 검사결과 에러 메세지를 저장할 state 변수
  const [errors, setErrors] = useState({
    bookTitle : ''
    , bookPrice : ''
    , publishDate : ''
    , cateNum : ''
  });

  // 유효성 검사 실행 함수
  const validateField = ()=>{

    // 유효성 검사 결과를 true, false로 표현하는 변수
    let isValid = true;

    // 최신 에러 메세지를 저장할 변수
    const newErrors = {
    bookTitle : ''
    , bookPrice : ''
    , publishDate : ''
    , cateNum : ''
    }
    
    // 제목 유효성 검사
    // 1. 제목을 입력하지 않았을때
    if(regBook.bookTitle===''){
      newErrors.bookTitle = '도서명은 필수 입력입니다.'
      isValid = false;
    }
    // 2. 제목이 최대글자를 넘겼을때
    else if(regBook.bookTitle.length > 30){
      newErrors.bookTitle = '30글자를 초과할 수 없습니다.'
      isValid = false;
    }

    // 가격 유효성 검사
    // 1. 필수입력
    if(regBook.bookPrice===''){
      newErrors.bookPrice = '도서 가격은 필수 입력입니다.'
      isValid = false;
    }
    // 2. 잘못된 데이터 (0이하, 문자 인지아닌지, )
    else if(isNaN(regBook.bookPrice)){
      // isNaN() : 괄호안이 숫자가 아니면 true, 숫자면 false
      newErrors.bookPrice = '문자는 올 수 없습니다. 숫자를 입력해주세요.'
      isValid = false;
    } else if (Number(regBook.bookPrice < 0)){
      newErrors.bookPrice = '음수는 올 수 없습니다. 양수를 입력해주세요.'
      isValid = false;
    }

    // cateNum 유효성 검사
    if(regBook.cateNum==='0'){
      newErrors.cateNum = '카테고리를 선택해주세요.'
      isValid = false;
    }

    // publishDate 유효성 검사
    if(regBook.publishDate===''){
      newErrors.publishDate = '날짜를 선택해주세요.'
      isValid = false;
    }
    
    // 조건에 따라 작성한 최신 에러 메세지를 errors state 변수에 저장
    setErrors(newErrors);

    return isValid;

  }

  // 마운트시 카테고리 목록 조회
  useEffect(()=>{
    getCateList1();
  },[]);
  // useEffect 안에 화살표 함수 앞에는 async 못쓴다
  // 그래서 함수를 하나 만들어서 await, async 붙이고 그 함수를 useEffect에 넣는다

  // 카테고리 목록 조회 함수
  const getCateList1 = async()=>{
    const response = await getCateList();
    response.status;  // 상태 200번
    setCateList(response.data);
    console.log(response.data);
  }


  // 스프링으로 저장할 데이터를 저장할 state 변수
  const [regBook, setRegBook] = useState({
    bookTitle : ''
    , bookPrice : ''
    , author : ''
    , bookIntro : ''
    , publishDate : ''
    , cateNum : '0'
  });

  // 데이터 입력마다 실행하는 함수
  const handleRegBook=(e)=>{
    setRegBook((prev)=>{
      return {
        ...prev
        , [e.target.name] : e.target.value
      }
    })
    // 키 입력시 유효성 검사 결과 나오는 에러메세지를 초기화 하는 코드
    if(errors[e.target.name]){
      setErrors((prev)=>{
        return {
          ...prev
          , [e.target.name] : ''
        }
      })
    }

  }    
      

  // 도서 1권 등록 함수
  const regButton = async()=>{
    //유효성 검사 실행
    const isValid = validateField();
    if(!isValid){
      return;
    }
    const response = await regButton1(regBook);
    if(response.status===201){
      setRegBook(response.data)
      console.log(response.data)
      alert('등록성공')
    } else {
      alert('등록실패')
    }
  }




  console.log(regBook);
  

  return (
    <>
      <div>

        <div>
          <p>Book Category</p>
          <select 
            name='cateNum'
            value={regBook.cateNum}
            onChange={(e)=>{handleRegBook(e)}}
          >
            <option value='0'>카테고리</option>
            {
              cateList.map((e, i)=>{
                return(
                  <option 
                    key={e.cateNum}
                    value={e.cateNum}
                  >{e.cateName}</option>
                )
              })
            }
            
          </select>
          {errors.cateNum && <p className='error'>{errors.cateNum}</p> }
        </div>

        <div>
          <p>Book Title</p>
          <Input
            
            name='bookTitle'
            value={regBook.bookTitle}
            onChange={(e)=>{handleRegBook(e)}}
          />
          {errors.bookTitle && <p className='error'>{errors.bookTitle}</p> }
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <td>Price</td>
                <td>Author</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input
                    
                    name='bookPrice'
                    value={regBook.bookPrice}
                    onChange={(e)=>{handleRegBook(e)}}
                  />
                </td>
                <td>
                  <Input
                    
                    name='author'
                    value={regBook.author}
                    onChange={(e)=>{handleRegBook(e)}}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {errors.bookPrice && <p className='error'>{errors.bookPrice}</p> }
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <p>Introduce</p>
          <textarea 
            cols={30}
            rows={5}
            name='bookIntro'
            value={regBook.bookIntro}
            onChange={(e)=>{handleRegBook(e)}}
          ></textarea>
        </div>

        <div>
          <p>Publish Date</p>
          <Input
            type='date'
            name='publishDate'
            value={regBook.publishDate}
            onChange={(e)=>{handleRegBook(e)}}
          />
          {errors.publishDate && <p className='error'>{errors.publishDate}</p> }
        </div>

        <div>
          <Button
            title='도서등록'
            onClick={(e)=>{regButton(e)}}
          />
        </div>
      </div>  

    </>
  )
}

export default BookForm