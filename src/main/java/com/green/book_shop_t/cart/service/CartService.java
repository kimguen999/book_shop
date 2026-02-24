package com.green.book_shop_t.cart.service;


import com.green.book_shop_t.book.mapper.BookImgMapper;
import com.green.book_shop_t.book.mapper.BookMapper;
import com.green.book_shop_t.cart.dto.CartDTO;
import com.green.book_shop_t.cart.mapper.CartMapper;
import com.green.book_shop_t.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
  private final CartMapper cartMapper;
  private final BookMapper bookMapper;
  private final BookImgMapper bookImgMapper;
  private final MemberMapper memberMapper;

  // 장바구니 삽입 기능
  public void insertCart(CartDTO cartDTO){
    cartMapper.insertCart(cartDTO);
  }


  // 장바구니 리스트 조호 ㅣ기능
  public List<CartDTO> cartList(String memEmail){
    return cartMapper.cartList(memEmail);
  }



}
