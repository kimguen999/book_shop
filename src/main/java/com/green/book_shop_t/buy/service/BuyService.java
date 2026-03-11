package com.green.book_shop_t.buy.service;


import com.green.book_shop_t.buy.dto.*;
import com.green.book_shop_t.buy.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BuyService {
  private final BuyMapper buyMapper;

  // 트랜젝션  (둘중 하나라도 안되거나 오류나면 롤백)
  @Transactional(rollbackFor = Exception.class)
  // 무슨 이유든 오류나면 롤백 = Exception.class

  // 장바구니에서 구매 등록 기능 + 도서상세에서 1권씩 등록
  public void insertBuy(ShopBuyDTO shopBuyDTO){
    // SHOP_BUY INSERT
    buyMapper.insertBuy(shopBuyDTO);

    // BUY_DETAIL INSERT
    buyMapper.insertBuyDetail(shopBuyDTO);

  }

  // 오늘과 이달의 주문건수 및 매출액 조회 기능
  public Map<String, Integer> selectSaleInfo(){
    return buyMapper.selectSaleInfo();
  }

  // 특정 회원의 구매내역 목록 조회 기능
  public List<BuyListDTO> selectBuyList(String memEmail){
    return buyMapper.selectBuyList(memEmail);
  }

  // 구매자 랭킹 조회 기능
  public List<TopBuyerDTO> selectTopBuyer(){
    return buyMapper.selectTopBuyer();
  }

  // 인기 도서 5권 랭킹 조회 기능
  public List<TopBookDTO> selectTopBook(){
    return buyMapper.selectTopBook();
  }


  // 최근 10일 차트 데이터 조회 기능
  public List<Map<String, Object>> selectSale10(List<Integer> dayList){
    return buyMapper.selectSale10(dayList);
  }


  //



}
