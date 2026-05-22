package com.green.book_shop_t.filter;


import jakarta.servlet.*;

import java.io.IOException;

// Dispatcher Servlet(대장Controller) 디스패처서블릿에 요청이 들어오기 전 실행할 검문서 정의
// Filter 인터페이스를 구현하는 클래스는 필터 역할을 수행
// Filter 인터페이스에 선언된 doFilter() 메서드에 필터 시 적용할 코드를 작성
public class Filter1 implements Filter {

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

    System.out.println("Filter1 클래스의 doFilter 메서드 실행");
    filterChain.doFilter(servletRequest, servletResponse);  // 다음 흐름 진행




  }
}
