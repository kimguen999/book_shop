import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import axios from 'axios';
import { regButton1 } from '../../api/bookApi';
import { getCateList } from '../../api/bookCateApi';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';

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

  // 선택할 이미지 파일을 저장할 state 변수
    const [mainImg, setMainImg] = useState(null); // 대표 이미지 저장할 변수
    const [subImgs, setSubImgs] = useState(null); // 상세 이미지 저장할 변수






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

    // 입력한 도서 정보 및 첨부파일 정보를 모두 저장할 수 있는 FormData 객체 생성 및 데이터 적재
    // 입력한 데이터 및 파일을 모두 spring으로 보내기 위한 문법

    // 도서 정보 저장
    const regForm = new FormData();  // 모든 정보를 담을 통
    // regForm.append('키name', '밸류kim');
    regForm.append('bookTitle', regBook.bookTitle);
    regForm.append('bookPrice', regBook.bookPrice);
    regForm.append('author', regBook.author);
    regForm.append('bookIntro', regBook.bookIntro);
    regForm.append('publishDate', regBook.publishDate);
    regForm.append('cateNum', regBook.cateNum);

    // 파일 정보 저장
    regForm.append('mainImg', mainImg);

    // 상세 파일들 정보 저장 (배열이기 때문에 객체 하나하나 떼서 반복으로 저장해야함)
    // 배열 데이터를 전달할 수 없기 때문에, 파일 하나하니씩 반복해서 적재
    for(const e of subImgs){
      regForm.append("subImgs",e);
    }

    const response = await regButton1(regForm);
    if(response.status===201){
      setRegBook(response.data)
      console.log(response.data)
      alert('등록성공')
    } else {
      alert('등록실패')
    }
  }

  console.log('subImgs - ',subImgs);



  console.log(regBook);
  

  return (
    <>
      <div>
        <div>
          <p>Book Category</p>
          
          <Select 
            name='cateNum'
            value={regBook.cateNum}
            onChange={(e)=>{handleRegBook(e)}}
          >
            <option value='0'>카테고리 선택</option>
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
            
          </Select>
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
          <Textarea 
            cols={30}
            rows={5}
            name='bookIntro'
            value={regBook.bookIntro}
            onChange={(e)=>{handleRegBook(e)}}
          ></Textarea>
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
          {/* 이미지 파일 선택 태그 */}
          {/* 이미지명을 데이터베이스에 저장 (파일 자체가 아니라 파일명을 저장) */}
          {/* 서버(Spring)에서 선택한 이미지 파일도 저장 -> 첨부, 파일 업로드 */}
          <input // 대표 이미지
            type="file" 
            onChange={e=>{
              // 업로드할 파일 선택할 때 onChange 이벤트 실행
              console.log(e.target.files)
              console.log(e.target.files[0].name)  // 키값이 숫자이므로 [''], 숫자가 아닐땐.
              console.log(e.target.files.length)
              console.log(e.target.files['length'])
              // 대표 이미지를 mainImg에 저장
              setMainImg(e.target.files[0]);
            }}
          />
        </div>

        <div>
          {/* multiple 속성 사용시 다중 선택 가능 */}
          <input // 상세 이미지
            type="file" 
            multiple={true}
            onChange={e=>{
              console.log(e.target.files)
              // 선택할 모든 파일명 console에 출력 & 저장
              for(let i = 0; i<e.target.files.length; i++){
                console.log(e.target.files[i].name)
              }
              // 선택한 파일 전체를 저장할 배열 생성 (키값이 배열과 비슷해서 배열로 하면 편함)
              const fileArr = [];
              // 선택한 파일 수만큼 배열에 파일을 저장
              for(let i = 0; i<e.target.files.length; i++){
                fileArr.push(e.target.files[i]);
              }
              // 상세 이미지 
              setSubImgs(fileArr);
            }}
          />
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