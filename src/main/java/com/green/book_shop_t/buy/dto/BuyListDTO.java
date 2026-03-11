package com.green.book_shop_t.buy.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

// 구매내역 목록 조회용 DTO
@Getter
@Setter
@ToString
public class BuyListDTO {

  private int buyNum;
  private int buyPrice;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime buyDate;

  private List<BuyDetailInfoDTO> detailList;

}
