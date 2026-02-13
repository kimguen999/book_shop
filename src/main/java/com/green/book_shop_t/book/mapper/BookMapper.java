package com.green.book_shop_t.book.mapper;

import com.green.book_shop_t.book.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {

//  도서 1권씩 등록 쿼리 실행 메서드
  void insertBook(BookDTO bookDTO);

  // 도서 목록 조회 쿼리 실행 메서드
  List<BookDTO> bookList();

  // 도서 1권 상세 조회 쿼리 실행 메서드
  BookDTO bookDetail(int bookNum);
}
