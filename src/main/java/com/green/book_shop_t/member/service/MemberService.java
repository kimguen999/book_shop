package com.green.book_shop_t.member.service;

import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberMapper memberMapper;

  // 회원가입 기능
  public void join(MemberDTO memberDTO){
    memberMapper.join(memberDTO);
  }

  // 사용가능 email 확인 기능 (사용 가능하면 return true)
  public boolean isUsableEmail(String memEmail){
    // 이메일이 조회되었다 -> 중복 이메일이다.
    // 이메일이 조회되지 않음(email == null) -> 사용 가능 이메일이다.
    String email= memberMapper.isUsableEmail(memEmail);
    return email==null;
//  return email==null?true:false; 같은거
  }
}









