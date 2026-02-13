import React from 'react'
import styles from './ManagerHeader.module.css'
import { Link, useNavigate } from 'react-router-dom';

// 매니저가 보는 페이지 헤더
const ManagerHeader = ({setLoginInfo}) => {

  // 로그인 여부 확인
  const loginInfo = sessionStorage.getItem('loginInfo');
  const loginInfo_obj=JSON.parse(loginInfo);

  // 매니저가 로그인하면 도서등록페이지로 이동
  const nav = useNavigate();

  


  return (
    <div className={styles.container}>
      <img src="/logo.png" className={styles.logo} />
      <ul>
        {
          loginInfo==null
          ?
          <>
            <li>
              <Link to='/login'>login</Link>
            </li>
            <li>
              <Link to='/join'>join</Link>
            </li>
          </>
          : 
          <>
            <li>
              {loginInfo_obj.memName}님 반갑습니다.
            </li>
            <li>
              <Link></Link>
            </li>
            <li
              style={{cursor : 'pointer'}}
              onClick={e=>{
                sessionStorage.removeItem('loginInfo')
                setLoginInfo({})
                nav('/')
              }}
            >
              logout
            </li>
          </>

}
      </ul>
    </div>
  )
}

export default ManagerHeader