package com.green.book_shop_t.buy.mapper;

import com.green.book_shop_t.buy.dto.BuyDetailDTO;
import com.green.book_shop_t.buy.dto.ShopBuyDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BuyMapper {

  // 장바구니에서 구매 등록 쿼리 실생 메서드
  void insertBuy(ShopBuyDTO shopBuyDTO);

  // 도서 상세에서 등록 (1권씩) 쿼리 실행 메서드
  void insertBuyDetail(ShopBuyDTO shopBuyDTO);


}
