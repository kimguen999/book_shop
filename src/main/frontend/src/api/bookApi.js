
import axios from "axios"


// 도서 등록 함수
// 이미지 파일도 함께 전달하기 위해서는 통신 설정을 변경해야함
export const regButton1 = async (regBook)=>{
  try{
    // 데이터 전송시 파일 데이터도 포함시킨다는 설정
    const fileConfig = {
      header : {'Content-Type' : 'multipart/form-data'}
    }

    const response = await axios.post(`http://localhost:8080/books`, regBook, fileConfig)
    return response;
  } catch (e){
    console.log('도서 1권 등록 axios 오류',e)
  }
}


// 도서 목록 조회 axios
export const getBookList = async ()=>{
  try{
    const response = await axios.get(`http://localhost:8080/books`);
    return response;
  } catch(e){
    console.log('도서 목록 조회 axios 오류',e)
  }
}


// 도서 1권 상세 조회 axios
export const getBookDetail = async ()=>{
  try{
    const response = await axios.get(`http://localhost:8080/books/${bookNum}`);
    return response;
  } catch(e){
    console.log('도서 상세 조회 axios 오류',e)
  }
}