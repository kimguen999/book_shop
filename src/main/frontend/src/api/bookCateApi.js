
// BOOK_CATEGORY 테이블과 통신하는 기능 정의

import axios from "axios"


// 카테고리 목록 조회 axios
export const getCateList = async()=>{
  try{
    const response = await axios.get(`http://localhost:8080/categories`);
    return response;
  }catch(e){
    console.log("카테고리 목록 axios 오류", e) 
    // 쉼표 뒤는 오류를 출력하는 것이 아니라 그냥 출력자리다
    // 그런데 매개변수 e가 오류이므로 오류 출력인것이다
  }
}
