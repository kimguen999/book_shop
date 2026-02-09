import React, { useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input';
import styles from './Join.module.css';
import axios from 'axios';
import { insertMember } from '../../api/memberApi';
import { useNavigate } from 'react-router-dom';


const Join = () => {

  const nav = useNavigate();

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
  }

  console.log(joinData);

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
              />
            </div>
          </div>
          <div>
            <p>Password</p>
            <Input
              type='password'
              name='memPw'
              value={joinData.memPw}
              onChange={e=>handleJoinData(e)}
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <Input
              type='password'
              name='confirmPw'
              value={joinData.confirmPw}
              onChange={e=>handleJoinData(e)}
            />
          </div>
          <div>
            <p>Name</p>
            <Input
              name='memName'
              value={joinData.memName}
              onChange={e=>handleJoinData(e)}
            />
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
          </div>
          <div>
            <p>Address</p>
            <div className={styles.addr_div}>
              <Input
                name='memAddr'
                value={joinData.memAddr}
                onChange={e=>handleJoinData(e)}
              />
              <Button
                title='검색'
                variant='gray'
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
              onClick={e=>goJoin()}
            />
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