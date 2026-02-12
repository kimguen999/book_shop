import React, { useEffect } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

//일반 사용자가 보는 페이지의 헤더 영역

const Header = () => {
  console.log('header');


  //   // 로그인 여부 확인
  
  const loginInfo = sessionStorage.getItem('loginInfo');
  const loginInfo_obj = JSON.parse(loginInfo)
  console.log(loginInfo)
  console.log(loginInfo_obj)
  // console.log(loginInfo_obj.memName)
  
    //   // 객체가 아닌 문자열이기 때문에 객체로 바꿔서 이름을 뽑아내야함
  useEffect(()=>{
    const inOut = ()=>{
      if(loginInfo===null){
        return 'Login'
      } else {
        return 'Logout'
      }
    } 
  },[loginInfo])

  const inOut = ()=>{
    if(loginInfo===null){
      return 'Login'
    } else {
      return 'Logout'
    }
  } 
  
  const click = (e)=>{
    sessionStorage.removeItem('loginInfo')
  }
    



  return (
    <div>
      <div className={styles.top_menu}>
        <ul>
          <li>
            {loginInfo!==null && `${loginInfo_obj.memName}님 반갑습니다.`}
          </li>
          <li>
            <Link 
              to='/login'
              onClick={(e)=>{click(e)}}
            >{inOut()}</Link>
          </li>
          <li>
            <Link to='/join'>Join</Link>
          </li>
        </ul>
      </div>
      <div className={styles.banner_div}>
        <img 
          className={styles.banner_img}
          src="/book_banner.PNG" 
        />
        <h3 className={styles.banner_title}>BOOK SHOP</h3>
      </div>
      <div>
        일반사용자가 보는 메뉴
      </div>
    </div>
  )
}

export default Header