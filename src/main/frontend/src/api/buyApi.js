import axios from "axios"

export const insertBuy = async (data)=>{
  try{
    const response = await axios.post(`http://localhost:8080/buys`,data);
    return response;
  }catch(e){
    console.log("도서 구매 등록 axios 오류" ,e)
  }
}

// 구매내역 목록 조회 axios
export const getBuyList = async (memEmail)=>{
  try{
    const response = await axios.get(`http://localhost:8080/buys/list`, {
      params: { memEmail }
    });
    return response;
  }catch(e){
    console.log("구매내역 조회 axios 오류", e)
  }
}