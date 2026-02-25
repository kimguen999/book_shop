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
  // (post) localhost:8080/carts
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
  // (get) localhost:8080/carts/aaa@oiu.com
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
  // 장바구니 1줄 삭제 api
  // (delete) localhost:8080/carts/3
  @DeleteMapping("/{cartNum}")
  public ResponseEntity<?> deleteCart(@PathVariable("cartNum") int cartNum){
    try {
      cartService.deleteCart(cartNum);
      System.out.println(cartNum+"번째 상품이 정상적으로 삭제되었습니다.");
      return ResponseEntity.status(HttpStatus.OK).build();
    } catch (Exception e){
      log.error("장바구니 삭제 중 오류 발생" , e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // 중복상품조회.업데이트를 등록에 한번에 적음

//  // 장바구니 조회해서 중복된 상품 있는지 판단하는 조회 api
//  // (get) localhost:8080/carts/bb@naver.com/3
//  @GetMapping("/{memEmail}/{bookNum}")
//  public ResponseEntity<?> duplication(@PathVariable("memEmail") String memEmail
//                , @PathVariable("bookNum") int bookNum){
//    try {
//      CartDTO cartDTO = new CartDTO();
//      cartDTO.setMemEmail(memEmail);
//      cartDTO.setBookNum(bookNum);
//
//      CartDTO duplication = cartService.duplication(cartDTO);
//      return ResponseEntity.status(HttpStatus.OK).body(duplication);
//    } catch (Exception e){
//      log.error("장바구니 중복 상품 조회 중 오류 발생",e);
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }



}
