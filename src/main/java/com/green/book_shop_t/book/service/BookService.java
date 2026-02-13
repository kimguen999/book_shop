package com.green.book_shop_t.book.service;

import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.mapper.BookMapper;
import com.green.book_shop_t.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
  private final BookMapper bookMapper;

  // 도서 1권씩 등록 기능
  public void insertBook(BookDTO bookDTO){
    bookMapper.insertBook(bookDTO);
  }

  // 도서 목록 조회 기능
  public List<BookDTO> bookList(){
    return bookMapper.bookList();
  }

  // 도서 1권 상세 조회 기능
  public BookDTO bookDetail(int bookNum){
    return bookMapper.bookDetail(bookNum);
  }


}
