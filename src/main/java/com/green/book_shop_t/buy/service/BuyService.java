package com.green.book_shop_t.buy.service;


import com.green.book_shop_t.buy.dto.BuyDetailDTO;
import com.green.book_shop_t.buy.dto.ShopBuyDTO;
import com.green.book_shop_t.buy.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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




}
