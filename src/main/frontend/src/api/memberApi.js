// 회원과 관련된 axios 기능을 정의한 파일

import axios from 'axios';

// 회원가입 요청 api
/**
 * 회원가입 쿼리 실행 axios 함수
 * @param {Object} joinData 회원가입시 입력한 객체 데이터
 * @returns {Promise}
 */
export const insertMember = async (joinData)=>{
  try{
    const response = await axios.post('http://localhost:8080/members',joinData);
    return response;
  }catch(e){
    console.log('회원가입 axios 에러',e)
  }
}


/**
 * 입력한 email 중복인지 확인하는 api
 * @param {string} memEmail 입력한 email
 * @returns {Promise}
 */
export const checkId = async(memEmail)=>{
  try{
    const response1 = await axios.get(`http://localhost:8080/members/checkId/${memEmail}`);
    return response1;
  }catch(e){
    console.log('email 중복 확인 axios 오류',e);
    return null;
  }
}


/**
 * 
 * @param {*} regBook 
 * @returns 
 */

