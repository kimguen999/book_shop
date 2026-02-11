package com.green.book_shop_t.cate.controller;


import com.green.book_shop_t.cate.dto.CateDTO;
import com.green.book_shop_t.cate.service.CateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j  // 로그.에러 사용가능하게끔
@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CateController {

  private final CateService cateService;

  // 카테고리 목록 조회 api
  // (get) localhost:8080/categories
  @GetMapping("")
  public ResponseEntity<?> getList(){
    try {
      List<CateDTO> cateList = cateService.getList();
      return  ResponseEntity.status(HttpStatus.OK).body(cateList);
    } catch (Exception e){
      log.error("카테고리 목록 조회 중 오류 발생",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

  }

}
