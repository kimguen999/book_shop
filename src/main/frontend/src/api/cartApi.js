import axios from "axios"

export const regCart = async (regData)=>{
  try{
    const response = await axios.post(`http://localhost:8080/carts`,regData);
    return response;
  } catch(e){
    console.log('장바구니 등록 axios 오류',e)
  }
}


export const getCart = async (memEmail)=>{
  try{
    const response = await axios.get(`http://localhost:8080/carts/${memEmail}`)
    return response;
  } catch(e){
    console.log('장바구니 등록 axios 오류', e)
  }

}