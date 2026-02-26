import React, { useState } from 'react'

const CheckboxTest = () => {

  // 선택한 체크박스 데이터를 저장할 state 변수
  // 체크박스 변수는 배열로 받는다
  const [fruits, setFruits] = useState(['apple', 'banana', 'grape']);

  const [isChecked, setIsChecked] = useState(true);




  //---------------------------------------------------------

  // 자바스크립트의 배열에 특정 데이터가 존재하는지 판단하기 위한 문법
  const arr = [1,2,3];
  // arr 배열에 2가 포함되어 있는지 검사
  const result = arr. includes(2)   // -> true


  // filter() : 조건에 맞는 데이터만 걸러서 배열로 리턴

  // arr = [1,2,3,4,5]
  
  // # 2보다 큰 수만 걸러내고 싶을때
  // arr.filter((e)=>{return e > 2})
  // arr.filter(e => e > 2);

  // # 짝수만 걸러내고 싶을때
  // arr.filter(e => e%2===0);

  // arr = ['자바','파이썬','c++']
  // # c++을 제외한 배열 가져오기
  // arr.filter(e => e!=='c++');

  // stuList=[
  //  {stuNum : 1, name : 'kim',  score : 80}
  //  {stuNum : 2, name : 'lee',  score : 60}
  //  {stuNum : 3, name : 'part',  score : 100}
  // ]
  // # 점수가 80점 이상인 학생만 필터링
  // stuList.filter(e=>e.score>=80);

  //---------------------------------------------------------

  // 체크박스 변경시 실행 함수
  const handleCheckbox = (e)=>{
    // 체크한 경우   e.target.checked는 체크 됐을때 true값을 반환
    if(e.target.checked){
      setFruits([...fruits, e.target.value])
    } 
    // 체크 해제한 경우
    else{ 
      // filter() : 조건에 맞는 데이터만 걸러서 배열로 리턴
      setFruits(fruits.filter(each=>each !== e.target.value));
      setIsChecked(false)
    }
  }

  console.log(fruits);

  return (
    <>
      <h2>체크박스 테스트 + filter()</h2>  
      <table border={1}>
        <thead>
          <tr>
            <td>
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={e=>{
                  // 전체체크박스 컨트롤
                  setIsChecked(e.target.checked)

                  // 내용부의 체크박스 컨트롤
                  if(e.target.checked){
                    setFruits(['apple', 'banana', 'grape']);
                  }else{
                    setFruits([])
                  }
                }}
              />
            </td>
            <td>과일</td>
            <td>가격</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input 
                type="checkbox" 
                value='apple'
                // checked={fruits 변수에 apple이 포함되어 있으면}
                checked={fruits.includes('apple')}
                onChange={e=>handleCheckbox(e)}
              />
            </td>
            <td>사과</td>
            <td>4,000원</td>
          </tr>
          <tr>
            <td>
              <input 
                type="checkbox" 
                value='banana'
                checked={fruits.includes('banana')}
                onChange={e=>handleCheckbox(e)}
              />
            </td>
            <td>바나나</td>
            <td>3,000원</td>
          </tr>
          <tr>
            <td>
              <input 
                type="checkbox" 
                value='grape'
                checked={fruits.includes('grape')}
                onChange={e=>handleCheckbox(e)}
              />
            </td>
            <td>포도</td>
            <td>10,000원</td>
          </tr>
        </tbody>
      </table>
    
    </>
  )
}

export default CheckboxTest