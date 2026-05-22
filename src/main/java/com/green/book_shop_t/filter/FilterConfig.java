package com.green.book_shop_t.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// 필터가 여려개 있으면 필터체인이라 부름


// 정의한 필터를 어떻게 사용할지 설정하는 클래스

@Configuration  // 객체생성 + 이 클래스는 설정내용이 있다라는 것을 인지시켜줌
public class FilterConfig {

//  @Bean // 객체생성, 메서드 실행결과 리턴되는 데이터를 객체로 생성
//  // 스프링이 알아서 만들어주는 객체를 Bean이라한다
//  public FilterRegistrationBean<Filter1> filterRegistrationBean(){
//    FilterRegistrationBean<Filter1> registrationBean = new FilterRegistrationBean<>();
//
//    // Filter1 검문소 생성
//    registrationBean.setFilter(new Filter1());
//    // 검문소 적용 url 지정
//    registrationBean.addUrlPatterns("/*");
//    // 필터 실행 순서, 숫자가 낮을수록 우선순위
//    registrationBean.setOrder(1);
//
//    return registrationBean;
//  }
//
//
//
//  @Bean
//  public FilterRegistrationBean<Filter2> filterRegistrationBean2(){
//    FilterRegistrationBean<Filter2> registrationBean = new FilterRegistrationBean<>();
//
//    registrationBean.setFilter(new Filter2());
//    registrationBean.addUrlPatterns("/*");
//    registrationBean.setOrder(2);
//
//    return registrationBean;
//  }



}
