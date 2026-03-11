package com.green.book_shop_t.buy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 구매내역 상세 조회용 DTO (도서 정보 포함)
@Getter
@Setter
@ToString
public class BuyDetailInfoDTO {

  private int bookNum;
  private int buyCnt;
  private String bookTitle;
  private int bookPrice;
  private String uploadFileName;

}
