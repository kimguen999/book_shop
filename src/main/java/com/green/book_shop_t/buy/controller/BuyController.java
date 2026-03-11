package com.green.book_shop_t.buy.controller;


import com.green.book_shop_t.buy.dto.ShopBuyDTO;
import com.green.book_shop_t.buy.service.BuyService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

  // 오늘과 이달의 주문건수 및 매출액 조회 api
  // (get) localhost:8080/buys/saleInfo
  @GetMapping("/saleInfo")
  public ResponseEntity<?> selectBuyList(){
    try {
      Map<String, Integer> saleInfoMap = buyService.selectSaleInfo();
      return ResponseEntity.status(HttpStatus.OK).body(saleInfoMap);
    } catch (Exception e){
      log.error("주문건수 매출액 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }




}
