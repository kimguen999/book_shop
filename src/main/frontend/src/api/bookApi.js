
import axios from "axios"

export const regButton1 = async (regBook)=>{
  try{
    const response = await axios.post(`http://localhost:8080/books`, regBook)
    return response;
  } catch (e){
    console.log('도서 1권 등록 axios 오류',e)
  }
}