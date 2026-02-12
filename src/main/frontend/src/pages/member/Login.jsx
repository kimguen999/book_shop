import React, { useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { click } from '../../api/loginApi'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const nav = useNavigate();

  // 로그인 input 입력 저장 state 변수
  const [insertLogin, setInsertLogin] = useState({
    memEmail : ''
    , memPw : ''
  });

  // input 입력마다 실행 함수
  const handleInsertLogin = (e)=>{
    const {name, value} = e.target;
    setInsertLogin(prev=>({...prev, [name] : value}))
  }


  const clickLogin = async()=>{
    const response = await click(insertLogin);
    console.log('응답데이터',response.data)  
    // 스프링에서 null 리턴되면 리액트는 빈문자로 리턴
    if(response.data !== ''){
      alert('로그인 성공')

      // 로그인한 유저의 정보를 sessionStorage에 저장 
      // (그냥 변수에 저장하면 새로고침하면 로그인 풀리기 때문)
      sessionStorage.setItem('memEmail', response.data.memEmail)
      sessionStorage.setItem('memName', response.data.memName)
      sessionStorage.setItem('memRole', response.data.memRole)

      // state에 저장한 모든 데이터를 한방에 sessionStorage에 저장하는법
      // 로그인한 회원의 이메일, 이름, 권한 정보를 저장하는 변수
      const loginInfo = {
        memEmail : response.data.memEmail
        , memName : response.data.memName
        , memRole : response.data.memRole
      }
      // 로그인 정보를 sessionStorage에 저장하기 위해서 json으로 변경(안하면 [object Object]뜸)
      sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo))

      // 로그인 성공시 도서 목록 페이지로 이동
      nav('/')

    } else {
      alert('로그인 실패함 email, pw 다시적으삼')
      // input 입력 데이터 초기화
      setInsertLogin({
        memEmail : '',
        memPw : ''
      })
    }

    // json : 객체를 문자화
    //  JSON.stringify(객체); -> 객체를 json(문자화)으로 변경
    //  JSON.parse(); -> json(문자화)을 객체로 변경

    





  }
  
  return (
    <div>
      <h2>로그인 페이지</h2>
      
      <div>
        <Input
          name='memEmail'
          value={insertLogin.memEmail}
          placeholder = 'Email'
          onChange={e=>handleInsertLogin(e)}
        />
      </div>

      <div>
        <Input
          type='password'
          name='memPw'
          value={insertLogin.memPw}
          placeholder = 'Password'
          onChange={e=>handleInsertLogin(e)}
          onKeyDown={e=>{
            if(e.key==='Enter'){
              clickLogin();
            }}
          }
        />
      </div>

      <div>
        <Button
          title='로그인'
          onClick={e=>clickLogin(e)}
        />
      </div>
      
      
    </div>
    
  )
}

export default Login