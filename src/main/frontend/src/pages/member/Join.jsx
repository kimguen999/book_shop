import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input';
import styles from './Join.module.css';
import axios from 'axios';
import { checkId, insertMember } from '../../api/memberApi';
import { useNavigate } from 'react-router-dom';
import Postcode from '../../Postcode';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Join = () => {

  const nav = useNavigate();

  // 카카오 주소 사용 위한 선언
  const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  // 입력 정보 저장 state 변수
  const [joinData, setJoinData] = useState({
    memEmail : ''
    , memPw : ''
    , confirmPw : '' // MemberDTO에 없는 키값을 적어도 오류 안남.
    , memName : ''
    , memTel : '' // 완성된 연락처
    , tel1 : '' // 010
    , tel2 : '' // 1111 중간 4자리
    , tel3 : '' // 2222 마지막 4자리
    , memAddr : ''
    , addrDetail : ''
  });

  // 유효성 검사 (Validation) 결과 에러 메세지를 저장하는 state 변수
  const [errors, setErrors] = useState({
    memEmail : ''
    , memPw : ''
    , confirmPw : '' 
    , memName : ''
    , memTel : '' 
    , tel1 : ''
    , tel2 : ''
    , tel3 : ''
  });

  // 마운트 시점인지 판단을 위한 state 변수
  const [cnt, setCnt] = useState(0);

  useEffect(()=>{
    if(cnt==0){
      setCnt(cnt+1)
    }
  })

  // 유효성 검사 함수(값 입력할때마다 실행)
  const validateField=(name,value)=>{
    let errorMsg='';  // 에러 메세지
    switch(name){
      case 'memEmail' : 
        // email 형식 정규식
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(value.length < 5){
          errorMsg = '이메일은 다섯글자 이상이어야 합니다.'
        } else if(value.length>50){
          errorMsg = '이메일은 최대 50자 까지 가능합니다'
        } else if(!emailPattern.test(value)){ // 정규식에 맞지 않다면
          errorMsg = '이메일 형식이 맞지 않습니다.'
        }
        break;
      case 'memPw' : 
        // 비밀번호 정규식
        const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,50}$/;
        if(value.length<1){
          errorMsg = '비밀번호는 필수 입력입니다.'
        } else if(!pwPattern.test(value)){
          errorMsg = "비밀번호의 형식은 영어/숫자 조합, 최대 50자 까지 가능합니다."
        }
        break;
      case 'memName' : 
        if(value.length<1){
          errorMsg = '이름은 필수 입력입니다.'
        } else if(value.length>30){
          errorMsg = '이름이 너무 큽니다.'
        }
        break;
      
      case 'tel1' : 
        // 연락처1 정규식
        const telPattern1 = /^[0-9]{3}$/;
        if(!telPattern1.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break;
      case 'tel2' : 
        // 연락처2 정규식
        const telPattern2 = /^[0-9]{3,4}$/;
        if(!telPattern2.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break;
      case 'tel3' : 
        // 연락처3 정규식
        const telPattern3 = /^[0-9]{4}$/;
        if(!telPattern3.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        
    }
    return errorMsg;
  }


  // 회원가입 버튼 활성화 여부 지정 state 변수
  const [isDisable, setIsDisable] = useState(true);

  // 입력하때마다 실행하는 함수
  const handleJoinData = (e)=>{

    // 다른 데이터를 변경하고 있다면....
    const {name, value} = e.target;

    setJoinData(prev=>({...prev , [name] : value}));

    // 만약 연락처를 변경하고 있다면....
    if(name==='tel1' || name==='tel2' || name==='tel3'){
      setJoinData(prev=>({
        ...prev
        , memTel : `${prev.tel1}-${prev.tel2}-${prev.tel3}`
      }))
    }
    // email 중복확인 눌렀고, 다시 email 변경한다면 회원가입 비활성화
    if(name==='memEmail'){
      setIsDisable(true);
    }

    // 유효성 검사 실행
    const errorMsg = validateField(name, value);

    const keyName = name==='tel1' || name==='tel2' || name==='tel3' ? 'memTel' : name;

    setErrors(prev=>{
      return {
        ...prev
        , [keyName] : errorMsg
      }
    });
  }

  // errors 객체의 모든 key에 대한 value가 빈 문자인지 확인하는 코드
  // errors 객체의 값이 변경될때만 실행
  useEffect(()=>{
    // 마운트 시점에서 실행 안함
    if(cnt==0){
      return;
    }
    // errors 객체의 모든 value가 빈문자인지 확인, ->return true
    const result = Object.values(errors).every(value => {return value === ''});
    console.log('전부 빈문자 인지 여부',result)
    // 입력 데이터에 오류가 없ㅇ르때 회원강비 버튼 활성화
    if(result){
      setIsDisable(false)
    } else {
      setIsDisable(true)}

  },[errors])


  // 회원가입 버튼 클릭 시 실행함수
  const goJoin = async ()=>{
    const response = await insertMember(joinData);

    if(response.status===201){
      alert('회원가입을 축하합니다.');
      nav('/login');
    } else {
      alert('오류발생')
    }
  }

  // email 중복체크 함수
  const checkEmail = async()=>{
    const response = await checkId(joinData.memEmail);
    if(response.data===true){
      alert('사용 가능한 email입니다.')
      // 회원가입 버튼 활성화
      setIsDisable(false);
    } else{
      alert('중복된 email입니다.')
    }
  }

  // 주소 팝업에서 선택 시 실행
  const handleComplete = (data)=>{
    console.log(data.address);
    // 선택한 도로명 주소를 주소 입력창에 세팅
    setJoinData({...joinData, memAddr : data.address})
  }


  return (
    <div>
      <div >
        <div className={styles.container}>
          <div>
            <p>Email</p>
            <div className={styles.id_div}>
              <Input
                name='memEmail'
                value={joinData.memEmail}
                onChange={e=>handleJoinData(e)}
              />
              <Button
                title='중복확인'
                onClick={e=>{checkEmail(e)}}
              />
            </div>
            {errors.memEmail && <p className='error'>{errors.memEmail}</p>}
          </div>
          <div>
            <p>Password</p>
            <Input
              type='password'
              name='memPw'
              value={joinData.memPw}
              onChange={e=>handleJoinData(e)}
            />
            {errors.memPw && <p className='error'>{errors.memPw}</p>}
          </div>
          <div>
            <p>Confirm Password</p>
            <Input
              type='password'
              name='confirmPw'
              value={joinData.confirmPw}
              onChange={e=>handleJoinData(e)}
            />
            {errors.confirmPw && <p className='error'>{errors.confirmPw}</p>}
          </div>
          <div>
            <p>Name</p>
            <Input
              name='memName'
              value={joinData.memName}
              onChange={e=>handleJoinData(e)}
            />
            {errors.memName && <p className='error'>{errors.memName}</p>}
          </div>
          <div>
            <p>Tel</p>
            <div 
              className = {styles.tel_div}
            >
              <Input
                name='tel1'
                value={joinData.tel1}
                onChange={e=>handleJoinData(e)}
              />
              <Input
                name='tel2'
                value={joinData.tel2}
                onChange={e=>handleJoinData(e)}
              />
              <Input
                name='tel3'
                value={joinData.tel3}
                onChange={e=>handleJoinData(e)}
              />
            </div>
            {errors.memTel && <p className='error'>{errors.memTel}</p>}
          </div>
          <div>
            <p>Address</p>
            <div className={styles.addr_div}>
              <Input
                name='memAddr'
                value={joinData.memAddr}
                onChange={e=>handleJoinData(e)}
                readOnly={true}
                onClick={e=>open({ onComplete: handleComplete })}
              />
              <Button
                title='검색'
                variant='gray'
                onClick={e=>open({ onComplete: handleComplete })}
              />
            </div>
              <Input
                name='addrDetail'
                value={joinData.addrDetail}
                onChange={e=>handleJoinData(e)}
              />
          </div>
          <div className={styles.btn_div}>
            <Button
              title='회원가입'
              disabled={isDisable}
              onClick={e=>goJoin()}
            />
            {/* <Button>은 태그가 아니라 컴포넌트다.
             그래서 안에 있는 title이나 disabled 이런것은 props다 */}
          </div>
        </div>
      </div>






































      {/* <Button 
        title='aaa'
        variant='purple'
        size='small'
        onClick={test1}  
        // 함수 전달이기 때문에 ()필요없다
        // 함수 실행,호출 : 함수();  test1의 함수 실행 결과를 onClick에 넣겠다
        // 함수 전달 : 함수;  test1이라는 함수 자체를 onClick에 넣겠다
      />
      <Button 
        title='java'
        variant='green'
        size='medium'
        onClick={test1}
      />
      <Button 
        variant='gray'
      />
      <br />
      <Input 
        type='text'
        name='aaa'
        value={10}
        onChange={e=>{}}
      /> <br />
      <Input 
        type='number'
      /> <br />
      <Input 
        type='password'
      /> <br /> */}



    </div>
  )
}

export default Join