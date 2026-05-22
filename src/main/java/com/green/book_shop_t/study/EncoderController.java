package com.green.book_shop_t.study;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/encode")
@RequiredArgsConstructor
public class EncoderController {
  private final PasswordEncoder passwordEncoder;



  @GetMapping("/test1")
  public void test1(){
    // 매개변수로 전달된 문자열을 암호화
    String encode1 = passwordEncoder.encode("java");
    System.out.println("encode1 = " + encode1);

    String encode2 = passwordEncoder.encode("java");
    System.out.println("encode2 = " + encode2);

    // 원본데이터와 암호화된 데이터의 일치 여부 판단(true, false)
    // 첫번째 매개변수 : 암호화 되지 않은 문자열
    // 두번째 매개변수 : 암호화 한 문자열
    boolean result1 = passwordEncoder.matches("java", encode1);
    boolean result2 = passwordEncoder.matches("java", encode1);
    System.out.println(result1);
    System.out.println(result2);
  }


}
