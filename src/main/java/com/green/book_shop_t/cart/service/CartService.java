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

  // 장바구니 등록 기능
  public void insertCart(CartDTO cartDTO){
    // 현재 도서가 내 장바구니에 포함되어 있느지 확인
    // memEmail이 조회됨 -> 중복상품
    // memEmail이 조회안됨 (memEmail==null)->
    String memEmail = cartMapper.isDuplicateBook(cartDTO);
    // 내 장바구니에 없으면 추가한다(insert)
      if(memEmail == null){
        cartMapper.insertCart(cartDTO);

      }
    // 내 장바구니에 있으면 수량 변경(update)
      else {
        cartMapper.updateCartBook(cartDTO);
      }

  }


  // 장바구니 리스트 조호 ㅣ기능
  public List<CartDTO> cartList(String memEmail){
    return cartMapper.cartList(memEmail);
  }

//  // 장바구니 조회해서 중복된 상품 있는지 판단하는 기능
//  public CartDTO duplication(CartDTO cartDTO){
//    return  cartMapper.duplication(cartDTO);
//  }

  // 장바구니 목록 1줄 삭제 기능
  public void deleteCart(int cartNum){
    cartMapper.deleteCart(cartNum);
  }

}
