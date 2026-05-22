package com.green.book_shop_t.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS(Cross-Origin Resource Sharing) 설정 클래스
 *
 * CORS란?
 * - 다른 출처(origin)에서 실행 중인 웹 애플리케이션이
 *   현재 출처의 리소스에 접근할 수 있도록 허용하는 메커니즘
 * - 예: http://localhost:3000(React)에서 http://localhost:8080(Spring)으로 요청
 */
@Configuration  // Spring 설정 클래스임을 명시
public class WebConfig implements WebMvcConfigurer {

  // addResourceHandlers 메서드를 이용해서 스프링 서버에서 외부 파일로 접근하는 설정을 추가
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        // url에 http://localhost:8080/upload/** 패턴으로 입력하면
        .addResourceHandler("/upload/**")
        // D:/01-STUDY/dev/upload 이쪽을 참고하겠다
        .addResourceLocations("file:///D:/01-STUDY/dev/upload/");
  }


}