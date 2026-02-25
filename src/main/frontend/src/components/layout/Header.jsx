import React, { useEffect } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'

//일반 사용자가 보는 페이지의 헤더 영역

const Header = ({setLoginInfo}) => {

  //   // 로그인 여부 확인
  const loginInfo = sessionStorage.getItem('loginInfo');
  const loginInfo_obj = JSON.parse(loginInfo)
  console.log(loginInfo)
  console.log(loginInfo_obj)
  // console.log(loginInfo_obj.memName)
  // 객체가 아닌 문자열이기 때문에 객체로 바꿔서 이름을 뽑아내야함
  
  const nav = useNavigate();
  
  const goMyPage = ()=>{
    nav('/my/cartList')
  }



  return (
    <div>
      <div className={styles.top_menu}>
        <ul>
          {
            loginInfo==null
            ?
            <>
              <li>
                <Link to='/login'>login</Link>
              </li>
              <li>
                <Link to='/join'>Join</Link>
              </li>
            </>
            :
            <>
              <li>
                {loginInfo_obj.memName}님 반갑습니다.
              </li>
              <li
                onClick={e=>{goMyPage()}}
                style={{cursor : 'pointer'}}
              >마이페이지</li>
              <li>
                <span 
                  style={{cursor : 'pointer'}}
                  onClick={e=>{
                    sessionStorage.removeItem('loginInfo')
                    setLoginInfo(null)
                    alert('로그아웃 되었습니다.')
                    nav('/')}

                  }
                >logout</span>
              </li>
            </>
          }
          {/* <li>
            {loginInfo!==null && `${loginInfo_obj.memName}님 반갑습니다.`}
          </li> */}
          
        </ul>
      </div>
      <div 
        className={styles.banner_div}
        onClick={()=>{nav('/')}}
      >
        <img 
          className={styles.banner_img}
          src="/book_banner.PNG" 
          
        />
        <h3 className={styles.banner_title}>BOOK SHOP</h3>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Header