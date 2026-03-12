package com.green.book_shop_t.buy.controller;


import com.green.book_shop_t.buy.dto.BuyListDTO;
import com.green.book_shop_t.buy.dto.ShopBuyDTO;
import com.green.book_shop_t.buy.dto.TopBookDTO;
import com.green.book_shop_t.buy.dto.TopBuyerDTO;
import com.green.book_shop_t.buy.service.BuyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
  public ResponseEntity<?> getSaleInfo(){
    try {
      Map<String, Integer> saleInfoMap = buyService.selectSaleInfo();
      return ResponseEntity.status(HttpStatus.OK).body(saleInfoMap);
    } catch (Exception e){
      log.error("주문건수 매출액 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // 구매내역 목록 조회 api
  // (get) localhost:8080/buys/list?memEmail=xxx@xxx.com
  @GetMapping("/list")
  public ResponseEntity<?> getBuyList(@RequestParam String memEmail){
    try {
      List<BuyListDTO> buyList = buyService.selectBuyList(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(buyList);
    } catch (Exception e){
      log.error("구매내역 조회 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // 구매자 랭킹 조회 api
  // (get) localhost:8080/buys/topBuyer
  @GetMapping("/topBuyer")
  public ResponseEntity<?> selectTopBuyer(TopBuyerDTO topBuyerDTO){
    try {
      List<TopBuyerDTO> topBuyerList =  buyService.selectTopBuyer();
      return ResponseEntity.status(HttpStatus.OK).body(topBuyerList);
    } catch (Exception e){
      log.error("구매랭킹 조회 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // 인기 도서 5권 랭킹 조회 api
  // (get) localhost:8080/buys/topBook
  @GetMapping("/topBook")
  public ResponseEntity<?> selectTopBook(TopBookDTO topBookDTO){
    try {
      List<TopBookDTO> topBookList = buyService.selectTopBook();
      return ResponseEntity.status(HttpStatus.OK).body(topBookList);
    }catch (Exception e){
      log.error("인기 도서 5권 랭킹 조회 api 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // 최근 10일 차트 데이터 조회 api
  // (get) localhost:8080/buys/
  @GetMapping("/sale-10")
  public ResponseEntity<?> selectSale10(){
    try {
      // 9~0까지 데이터가 들어있는 리스트
      List<Integer> dayList = new ArrayList<>();
      for(int i = 9; i>-1; i--){
        dayList.add(i);
      }
      List<Map<String,Object>> topBuyerList =  buyService.selectSale10(dayList);
      return ResponseEntity.status(HttpStatus.OK).body(topBuyerList);
    } catch (Exception e){
      log.error("최근 10일 차트 데이터 조회 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }


}
