package com.green.book_shop_t.cart.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.dto.BookImgDTO;
import com.green.book_shop_t.member.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@ToString
public class CartDTO {


  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")

  private int cartNum;
  private int cartCnt;
  private LocalDateTime cartDate;
  private int bookNum;
  private String memEmail;
//  private String bookTitle;
//  private int bookPrice;
//  private String uploadFileName;
  private BookDTO bookList;
  private MemberDTO member;

}
