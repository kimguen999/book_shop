import axios from "axios"

export const click = async(insertLogin)=>{
  try{
    const response = await axios.get(`http://localhost:8080/members/login`, {params : insertLogin});
    return response;
  } catch(e){
    console.log("로그인 axios 오류",e)
  }
}