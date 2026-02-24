package com.green.book_shop_t.book.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString

public class BookDTO {


  @JsonFormat(pattern = "yyyy-MM-dd")

  private int bookNum;
  private String bookTitle;
  private String author;
  private int bookPrice;
  private int bookStock;
  private String bookIntro;
  private LocalDate publishDate;
  private int cateNum;
  // 1:n관계일때
  private List<BookImgDTO> bookImgList;


}
