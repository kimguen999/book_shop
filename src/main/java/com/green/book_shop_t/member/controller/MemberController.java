package com.green.book_shop_t.member.controller;

import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
  private final MemberService memberService;

  // 회원가입 api
  // (post) localhost:8080/members
  @PostMapping("")
  public ResponseEntity<?> join(@RequestBody MemberDTO memberDTO){
    try {
      memberService.join(memberDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("회원가입 중 에러 발생",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // email 사용 가능한지 체크 api  (사용가능하면 return true)
  // (get) localhost:8080/members/checkId/개인email
  @GetMapping("/checkId/{memEmail}")
  public ResponseEntity<?> checkId(@PathVariable("memEmail") String memEmail){
    try {
      boolean result = memberService.isUsableEmail(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    }catch (Exception e){
      log.error("email 중복 체크 중 에러 발생",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}







