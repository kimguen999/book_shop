package com.green.book_shop_t.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// 인증 및 인가에 대한 설정 내용을 작성하는 클래스
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  // 이 메서드는 security의 인증 및 인가에 대한 설정 내용을 작성하는 메서드
  // 메서드의 리턴타입, 매개변수가 정해져있음, 메서드명만 마음대로 사용 가능
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

    //------- http 객체에 인증 및 인가에 대한 설정을 세팅 --------

    http
        // 0. 아래 corsConfigurationSource() 메서드에서 리턴된 Bean을 cors 설정에 등록
        .cors(Customizer.withDefaults())
        // 1. csrf 설정을 disable로 세팅 -> 세선방식 로그인에서는 사용하지만, jwt 인증방식에서는 사용 안함
        .csrf(csrf -> csrf.disable())
        // 2. form 로그인 방식 사용 안함으로 세팅
        .formLogin(form -> form.disable())
        // 3. httpBasic 인증방식 사용 안함
        .httpBasic(basic -> basic.disable())
        // 4. 세션을 stateless 상태로 지정 (세션이 유지 되지 않게끔)
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        // 인증 및 인가에 대한 설정 ********
        .authorizeHttpRequests(
            auth ->
                auth.anyRequest().permitAll() // 모든 접근에 대한 요청을 허용한다.
        );

    // 인증 및 인가에 대한 설정 내용을 저장하고있는 http 객체를 리턴
    return http.build();

  }


  //CORS 설정 Bean
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true); //쿠키 정보를 통신하기 위한 설정
    config.addAllowedOrigin("http://localhost:5173"); //리액트에서의 요청 허용
    config.addAllowedHeader("*"); //모든 헤더 정보 허용
    config.addAllowedMethod("*"); //get, post, delete, put 등의 요청 메서드 허용

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  //비밀번호 암호화 기능을 제공하는 객체
  @Bean
  public PasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }


}
