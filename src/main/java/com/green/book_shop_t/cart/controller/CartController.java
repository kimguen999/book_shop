package com.green.book_shop_t.cart.controller;


import com.green.book_shop_t.cart.dto.CartDTO;
import com.green.book_shop_t.cart.service.CartService;
import com.green.book_shop_t.util.UploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/carts")
@Slf4j
@RestController
@RequiredArgsConstructor
public class CartController {
  private final CartService cartService;
  private final UploadUtil uploadUtil;


  // 장바구니 해상 상품 삽입 api
  // (post) localhost:8080/cart
  @PostMapping("")
  public ResponseEntity<?> insertCart(@RequestBody CartDTO cartDTO){
    try {
      cartService.insertCart(cartDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(cartDTO);
    } catch (Exception e){
      log.error("장바구니 해상 상품 삽입 중 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  
  // 장바구니 리스트 조회 api
  // (get) localhost:8080/cart/3
  @GetMapping("/{memEmail}")
  public ResponseEntity<?> cartList(@PathVariable("memEmail") String memEmail){
    try {
      List<CartDTO> cartDTOList = cartService.cartList(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(cartDTOList);
    }catch (Exception e){
      log.error("장바구니 리스트 조회 중 오류 발생",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }


}
