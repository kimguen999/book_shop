package com.green.book_shop_t.book.controller;

import ch.qos.logback.classic.Logger;
import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.dto.BookImgDTO;
import com.green.book_shop_t.book.service.BookService;
import com.green.book_shop_t.util.UploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequestMapping("/books")
@RestController
@RequiredArgsConstructor
public class BookController {
  private final BookService bookService;

  private final UploadUtil uploadUtil;

  // aplication.properties 파일의 file.upload.dir로 선언한 데이터를 주입
  @Value("${file.upload.dir}")
  private String uploadPath;


  // 도서 1권씩 등록 api
  // (post) localhost:8080/manage/book-form
  // 파일이 포함된 데이터를 react에서 FormData객체에 담겨 전송됨
  // 이때, 데이터를 전달받는 문법도 달라짐
  // BookDTO 매개변수 : FormData로 전달되는 데이터 중 key값이 bookDTO와 동일한 데이터를 전달받는 매개변수
  @PostMapping("")
  public ResponseEntity<?> insertBook(BookDTO bookDTO
          , @RequestParam("mainImg")MultipartFile mainImgFile
          , @RequestParam("subImgs")MultipartFile[] subImgs ){
    // 전송되 파일 데이터를 전달받을때는 @RequestParam + MultipartFile 자료형으로 받는다.
    // @RequestParam("전송되는 파일의 key값")MultipariFile 변수명
    // MultipartFile : 파일 받을수 있는 자료형
    // @RequestBody 어노테이션 없음
    try {

      // SHOP_BOOK 테이블에 INSERT 할 데이터 확인
      System.out.println("전달된 도서 정보 : "+ bookDTO);
      // 선택한 대표 파일명 확인
      System.out.println("전달된 대표 파일 이름 : "+ mainImgFile.getOriginalFilename());
      // 선택한 상세 파일들 확인
      for (MultipartFile img : subImgs){
        System.out.println("전달된 상세 파일들 이름 : "+img.getOriginalFilename());
      }



      // 대표파일 첨부 기능 메서드 호출
      // 리턴으로 원본파일명, 첨부파일명, isMain(Y)를 BookImgDTO 자료형으로 리턴해줌
      BookImgDTO dto = uploadUtil.fileUpload(mainImgFile);

      // 상세파일 첨부 기능 메서드 호출
      // 리턴으로 원본파일명, 첨부파일명, isMain(N)을 BookImgDTO 자료형 다수를 List로 리턴해줌
      List<BookImgDTO> imgList = uploadUtil.multipleFileUpload(subImgs);

      // 쿼리 실행시 빈값을 채울 모든 데이터를 통합
      imgList.add(dto);

      // 다음에 저장될 도서번호 조회
      int nextBookNum = bookService.getNextBookNum();

      // 조회한 nextBookNum을 bookDTO에 저장
      bookDTO.setBookNum(nextBookNum);

      // imgList 안의 모든 BookImgDTO 객체에도 도서번호를 저장
      for (BookImgDTO e : imgList){
        e.setBookNum(nextBookNum);
      }

      // SHOP_BOOK 테이블에 데이터 INSERT + BOOK_IMG 테이블에 데이터 INSERT
       bookService.insertBook(bookDTO, imgList);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch(Exception e){
      log.error("도서 등록 중 오류",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

      // 쿼리의 빈값을 채울수 있는 원본파일명, 첨부된파일명, 메인여부, 도서번호
//      mainImgFile.getOriginalFilename();


      // ---------대표 파일 첨부 기능 시작----------util/UploadUtil

//      // 이미지 파일 선택을 했을때만 업로드 로직 시작
//      // 빈 껍데기의 파일만 우선 만들기
//      if (mainImgFile!=null){
//        // 화면에서 선택한 원본 파일명
//        String originFileName = mainImgFile.getOriginalFilename();
//
//        // 첨부할 파일명 생성 (원본파일은 이름이 중복될수있기때문)
//        String uuid = UUID.randomUUID().toString();  // oijfwn-gisuu-....
//        // 원본파일의 확장자 추출
//        // String email ="abcd@naver.com"
//        // email.indexOf("@"); -> 4  : 매개변수에 입력한 무자열의 위치를 알려주는 메서드
//        // String fileName ="abcd.jpg"
//        // String result = fileName.substring(fileName.indexOf("."))         ->4   .부터 내용 다가져옴
//        // email.lastIndexOf("@") -> 4 : 매개변수에 입력한 문자열이 여러개일 경우 마지막으로 일치하는 위치
//        String extension = originFileName.substring(originFileName.lastIndexOf("."));
//
//        // 첨부할 파일명
//        String uploadFileName = uuid+extension; //
//
//        // 파일 생성 코드
//        // uploadPath : D:/01-STUDY/dev/upload/
//        File file = new File(uploadPath + uploadFileName);
//        // -> D:/01-STUDY/dev/upload/abc.jpg
//
//        // 빈껍데기 파일을 실제 이미지 파일로 변환
//        // 위 코드에서 만들어진 file에 첨부할 이미지 파일을 덮어씌운다.
//        mainImgFile.transferTo(file);
//        // bookDTO에 파일명 세팅
//
//      }
      // ---------대표 파일 첨부 기능 끝----------


      //------------상세 파일들 첨부 기능 시작--------------
//        if (subImgs!=null){
//          // 첨부한 파일 수만ㄴ큼 반복
//          for (MultipartFile subImg : subImgs){
//            // 원본파일명 가져오기
//            String originFileName = subImg.getOriginalFilename();
//            // 중복방지 위한 파일명 생성(uuid)
//            String uuid = UUID.randomUUID().toString();
//            // 원본파일에서 확장자는 추출
//            String extension = originFileName.substring(originFileName.lastIndexOf("."));
//            // 첨부할 파일명
//            String uploadFileName = uuid+extension;
//            // 파일 업로드 코드
//            File file = new File(uploadPath+uploadFileName);
//            subImg.transferTo(file);
//          }
//        }
      //------------상세 파일들 첨부 기능 끝--------------












  // 도서 목록 조회 api
  // (get) localhost:8080/books
  @GetMapping("")
  public ResponseEntity<?> bookList(){
    try {
      List<BookDTO> bookDTOList = bookService.bookList();
      return ResponseEntity.status(HttpStatus.OK).body(bookDTOList);
    }catch (Exception e){
      log.error("도서 목록 조회 중 오류 발생",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // 도서 1권 상세 조회 api
  // (@get) localhost:8080/books/3
  @GetMapping("/{bookNum}")
  public ResponseEntity<?> bookDetail(@PathVariable("bookNum") int bookNum){
    try {
      BookDTO bookDetail = bookService.bookDetail(bookNum);
      return ResponseEntity.status(HttpStatus.OK).body(bookDetail);
    } catch (Exception e){
      log.error("도서 상세 조회 중 오류 발생",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }





}
