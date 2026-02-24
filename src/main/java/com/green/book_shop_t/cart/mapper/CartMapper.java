package com.green.book_shop_t.cart.mapper;


import com.green.book_shop_t.cart.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {

  // 장바구니로 해당 상품 삽입 쿼리 실행 메서드
  void insertCart(CartDTO cartDTO);

  // 장바구니 리스트 조회 쿼리 실행 메서드
  List<CartDTO> cartList(String memEmail);

}
