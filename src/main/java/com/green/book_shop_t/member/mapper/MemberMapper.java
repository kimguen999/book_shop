package com.green.book_shop_t.member.mapper;

import com.green.book_shop_t.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

  // 회원가입 퀴리 실행 메서드
  void join(MemberDTO memberDTO);

  // 회원가입 email 중복 조회 쿼리 실행 메서드
  String isUsableEmail(String memEmail);

  // 로그인시 정보 조회 쿼리 실행 메서드
  MemberDTO selectLogin(MemberDTO memberDTO);
}
