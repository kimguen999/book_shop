package com.green.book_shop_t.buy.controller;


import com.green.book_shop_t.buy.dto.ShopBuyDTO;
import com.green.book_shop_t.buy.service.BuyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("buys")
@RestController
@RequiredArgsConstructor
public class BuyController {
  private final BuyService buyService;

  // 도서 구매 등록 (장바구니+상세1권씩) api
  // (post) localhost:8080/buys
  @PostMapping("")
  public ResponseEntity<?> addBuy(@RequestBody ShopBuyDTO shopBuyDTO){
    try{
      System.out.println(shopBuyDTO);
      buyService.insertBuy(shopBuyDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("구매 등록 중 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }




}
