package com.green.book_shop_t.cate.mapper;

import com.green.book_shop_t.cate.dto.CateDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CateMapper {

  // 카테고리 목록 조회 쿼리 실행 메서드
  List<CateDTO> selectCateList();

}
