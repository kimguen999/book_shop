
import axios from "axios"

export const regButton1 = async (regBook)=>{
  try{
    const response = await axios.post(`http://localhost:8080/books`, regBook)
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