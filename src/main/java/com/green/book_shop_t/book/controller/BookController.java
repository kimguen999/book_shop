package com.green.book_shop_t.book.controller;

import ch.qos.logback.classic.Logger;
import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/books")
@RestController
@RequiredArgsConstructor
public class BookController {
  private final BookService bookService;


  // 도서 1권씩 등록 api
  // (post) localhost:8080/manage/book-form
  @PostMapping("")
  public ResponseEntity<?> insertBook(@RequestBody BookDTO bookDTO){
    try {
      bookService.insertBook(bookDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch(Exception e){
      log.error("도서 등록 중 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }







}
