package com.green.book_shop_t.cate.service;

import com.green.book_shop_t.cate.dto.CateDTO;
import com.green.book_shop_t.cate.mapper.CateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CateService {

  private final CateMapper cateMapper;

  // 카테고리 목록 조회 기능
  public List<CateDTO> getList(){
    return cateMapper.selectCateList();
  }

}
