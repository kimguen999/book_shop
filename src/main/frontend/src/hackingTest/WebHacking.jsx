import React from 'react'


// Web Storage(cookie, localstorage, sessionstorage)
// 에는 문자열 데이터만 저장 가능
const WebHacking = () => {


  // local storage : 영구 저장 (지우기 전까지)

  // local Storage에 데이터 저장
  localStorage.setItem('local-name', 'kim');
  localStorage.setItem('local-age', '20');

  // local storage에 저장된 데이터 읽기
  localStorage.getItem('local-name'); //kim
  localStorage.getItem('local-age');  //20

  // local storage에 저장된 데이터 삭제
  localStorage.removeItem('local-name');



  
  // session storage : 브라우저 닫으면 데이터 사라짐

  // session Storage에 데이터 저장
  sessionStorage.setItem('session-name', 'lee')
  sessionStorage.setItem('session-age', '30')

  // session storage에 저장된 데이터 읽기
  sessionStorage.getItem('session-name'); //lee
  sessionStorage.getItem('session-age');  //30

  // session storage에 저장된 데이터 삭제
  sessionStorage.removeItem('local-name');

  return (
    <>
    
    
    </>
  )
}

export default WebHacking