import React from 'react'
import styles from './UserLayout.module.css'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Side from './Side'

/////////////////////////////////////////////////////////////////
//- 일반 회원이 보는 화면의 레이아웃, 상단 헤더만 존재(2분할 화면) -//
/////////////////////////////////////////////////////////////////

const UserLayout = ({setLoginInfo}) => {
  return (
    <div className={styles.container}>
      <Header setLoginInfo={setLoginInfo}/>
      <div className={styles.main}>
        <div className={styles.side}>
          <Side />
        </div>
        <div 
          className={styles.content}
          style={{marginTop : '20px'}}
        >
          {/* UserLayout 컴포넌트와 함께 열리는 컴포넌트의 위치를 지정 */}
          <Outlet/>
        </div>
      </div>
     
    </div>
  )
}

export default UserLayout