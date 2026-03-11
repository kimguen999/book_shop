package com.green.book_shop_t.study;


import com.green.book_shop_t.buy.service.BuyService;
import com.green.book_shop_t.cart.dto.CartDTO;
import com.green.book_shop_t.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {
  public final BuyService buyService;
  public final CartService cartService;

  @GetMapping("/test1")
  public Map<Integer, String> mapTest1(){
    // Map은 자바스크립트의 객체와 유사
    // List 객체 생성
    List<String> list = new ArrayList<>();

    // Map 객체 생성
    // Map<키의 자료형, 밸류의 자료형>
    Map<Integer, String> map = new HashMap<>();
    map.put(1, "aa");
    map.put(2, "bb");
    map.put(3, "cc");

    return map;
  }

  @GetMapping("/test2")
  public Map<String,Object> mapTest2(){
    // key는 문자열, value는 모든 자로형을 담을수 있는 Map객체 생성

    // Object는 모든 클래스의 부모 클래스이다.  -> 상속
    // 다형성 : 부모 자료형으로 자식 자료형을 담을 수 있다.
    Map<String, Object> map = new HashMap<>();
    //            ㄴ> 모든 자료형 커버 가능
    map.put("1",1);
    map.put("2",1.1);
    map.put("3","aaa");

    return map;
  }

  // 구매 목록 데이터(안만듬)와 장바구니 목록 데이터를 조회
  @GetMapping("/test3")
  public Map<String, Object> mapTest3(){

    //바이리스트 있다 치고

    //카트리스트
    List<CartDTO> cartList = cartService.cartList("bbb@naver.com");

    // 두 리스트 데이터를 모두 저장할수 있는 map 객체 생성
    Map<String, Object> map = new HashMap<>();
//    map.put("buyList", buyList);
    map.put("carList", cartList);
    return map;
  }


}














