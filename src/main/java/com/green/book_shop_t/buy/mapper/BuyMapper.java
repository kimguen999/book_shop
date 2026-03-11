package com.green.book_shop_t.buy.mapper;

import com.green.book_shop_t.buy.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BuyMapper {

  // 장바구니에서 구매 등록 쿼리 실행 메서드
  void insertBuy(ShopBuyDTO shopBuyDTO);

  // 도서 상세에서 등록 (1권씩) 쿼리 실행 메서드
  void insertBuyDetail(ShopBuyDTO shopBuyDTO);

  // 오늘과 이달의 주문건수 및 매출액 조회 쿼리 실행 메서드
  Map<String, Integer> selectSaleInfo();

  // 특정 회원의 구매내역 목록 조회 쿼리 실행 메서드
  List<BuyListDTO> selectBuyList(String memEmail);



  // 구매자 랭킹 조회 쿼리 실행 메서드
  List<TopBuyerDTO> selectTopBuyer();

  // 인기 도서 5권 랭킹 조회 쿼리 실행 메서드
  List<TopBookDTO> selectTopBook();

  // 최근 10일 차트 데이터 조회 쿼리 실행 메서드
  // 매개변수로 9~0이 들어있는 List를 전달해야함
  List<Map<String, Object>> selectSale10(List<Integer> dayList);

}
