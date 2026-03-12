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


  // 오늘, 이달 주문건수 및 매출액 조회 axios
export const dashboard_1 = async ()=>{
  try{
    const response = await axios.get(`http://localhost:8080/buys/saleInfo`)
    return response;
  } catch(e){
    console.log("오늘,이달 주문건수 및 매출액 조회 axios 오류",e)
  }
}

  // top 5 구매자 정보  조회 axios
export const dashboard_2 = async ()=>{
  try{
    const response = await axios.get(`http://localhost:8080/buys/topBuyer`)
    return response;
  } catch(e){
    console.log("top 5 구매자 정보 조회 axios 오류",e)
  }
}

  // top 5 도서 정보 조회 axios
export const dashboard_3 = async ()=>{
  try{
    const response = await axios.get(`http://localhost:8080/buys/topBook`)
    return response;
  } catch(e){
    console.log("top 5 도서 정보 조회 axios 오류",e)
  }
}
  
  // 최근 10일간 매출 정보 조회 axios
export const dashboard_4 = async ()=>{
  try{
    const response = await axios.get(`http://localhost:8080/buys/sale-10`)
    return response;
  } catch(e){
    console.log("최근 10일간 매출 정보 조회 axios 오류",e)
  }
}
