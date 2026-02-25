import axios from "axios"

// 장바구니에 등록 axios
export const regCart = async (regData)=>{
  try{
    const response = await axios.post(`http://localhost:8080/carts`,regData);
    return response;
  } catch(e){
    console.log('장바구니 등록 axios 오류',e)
  }
}


// 장바구니 목록 조회 axios
export const getCart = async (memEmail)=>{
  try{
    const response = await axios.get(`http://localhost:8080/carts/${memEmail}`)
    return response;
  } catch(e){
    console.log('장바구니 등록 axios 오류', e)
  }

}

// 장바구니 개별 삭제 버튼 delete axios
export const deleteOne1 = async (cartNum)=>{
  try{
    const response = await axios.delete(`http://localhost:8080/carts/${cartNum}`);
    return response;
  } catch(e){
    console.log('장바구니 개별 삭제 axios 오류' ,e)
  }
}