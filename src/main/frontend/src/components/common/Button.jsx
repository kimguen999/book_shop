import React from 'react'
import styles from './Button.module.css'

const Button = ({
  title='버튼'
  , variant='purple'
  , size='small'
  , disabled=false
  , ...props
  // 나머지 넘어오는 props 다받아줌
}) => {
  // props 사용
  // =''은 기본값을 준것이다. 버튼만 만들어도 글자'버튼'과 보라색이 적용되도록

 

  

  return (
    <>
      <button
        type='button'
        className={`
          ${styles.button}
          ${styles[variant]}
          ${styles[size]}
          ${disabled ? styles.disabled : ''}
        `}
        disabled={disabled}
        // []쓰는 이유는 키값을 변수처럼 쓰고 싶기 때문에.
        {...props}
        // onClick 함수가 이미 정의되어 있기 때문에 나머지 props를 가져와서 실행만 시키면되기 때문데 {...props} 씀
      >{title}</button>
    </>
  )
}

export default Button