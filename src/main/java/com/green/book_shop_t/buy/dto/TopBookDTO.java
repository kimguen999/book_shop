package com.green.book_shop_t.buy.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class TopBookDTO {
  private int bookNum;
  private int totalBuyCnt;
  private String bookTitle;
  private String author;

}
