import React, { useEffect, useState } from 'react'
import styles from './BuyList.module.css'
import { getBuyList } from '../../api/buyApi'
import dayjs from 'dayjs'

const BuyList = () => {

  // 구매내역 목록 저장 state 변수
  const [buyList, setBuyList] = useState([])

  // 상세보기 펼쳐진 buyNum 저장 state 변수
  const [openNum, setOpenNum] = useState(null)

  // 마운트시 구매내역 조회
  useEffect(() => {
    fetchBuyList()
  }, [])

  // 구매내역 조회 함수
  const fetchBuyList = async () => {
    const loginInfo = sessionStorage.getItem('loginInfo')
    console.log('loginInfo:', loginInfo)
    if (!loginInfo) {
      console.log('로그인 정보 없음')
      return
    }
    const { memEmail } = JSON.parse(loginInfo)
    console.log('memEmail:', memEmail)
    const response = await getBuyList(memEmail)
    console.log('buyList response:', response)
    if (response && response.data) {
      console.log('buyList data:', response.data)
      setBuyList(response.data)
    }
  }

  // 상세보기 토글 함수
  const toggleDetail = (buyNum) => {
    setOpenNum(openNum === buyNum ? null : buyNum)
  }

  // 구매 목록 행의 대표 도서명 (첫번째 책 제목 + 외 n개)
  const getTitle = (detailList) => {
    if (!detailList || detailList.length === 0) return '-'
    if (detailList.length === 1) return detailList[0].bookTitle
    return `${detailList[0].bookTitle} 외 ${detailList.length - 1}개`
  }

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>구매내역</h2>

        {buyList.length === 0 ? (
          <p className={styles.empty}>구매내역이 없습니다.</p>
        ) : (
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <td>No</td>
                <td>도서정보</td>
                <td>구매금액</td>
                <td>구매일자</td>
                <td>상세보기</td>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {buyList.map((buy, i) => (
                <React.Fragment key={buy.buyNum}>
                  {/* 구매 요약 행 */}
                  <tr>
                    <td>{i + 1}</td>
                    <td>{getTitle(buy.detailList)}</td>
                    <td>{buy.buyPrice?.toLocaleString()}원</td>
                    <td>{dayjs(buy.buyDate).format('YYYY년 M월 D일 H시 m분')}</td>
                    <td>
                      <button
                        className={styles.detailBtn}
                        type='button'
                        onClick={() => toggleDetail(buy.buyNum)}
                      >
                        {openNum === buy.buyNum ? '닫기' : '상세보기'}
                      </button>
                    </td>
                  </tr>

                  {/* 상세보기 펼침 행 */}
                  {openNum === buy.buyNum && (
                    <tr className={styles.detailRow}>
                      <td colSpan={5}>
                        <table className={styles.detailTable}>
                          <thead>
                            <tr>
                              <td>이미지</td>
                              <td>도서명</td>
                              <td>가격</td>
                              <td>수량</td>
                              <td>소계</td>
                            </tr>
                          </thead>
                          <tbody>
                            {buy.detailList.map((detail, j) => (
                              <tr key={j}>
                                <td>
                                  <img
                                    className={styles.detailImg}
                                    src={`http://localhost:8080/upload/${detail.uploadFileName}`}
                                    alt={detail.bookTitle}
                                  />
                                </td>
                                <td>{detail.bookTitle}</td>
                                <td>{detail.bookPrice?.toLocaleString()}원</td>
                                <td>{detail.buyCnt}</td>
                                <td>{(detail.bookPrice * detail.buyCnt)?.toLocaleString()}원</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default BuyList
