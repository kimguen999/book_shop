import React from 'react'
import styles from './Input.module.css'

const Input = ({
  type='text'
  , ...props
}) => {
  return (
    <>
      <input
        type={type} 
        className={styles.input}
        {...props}
      />
    </>
  )
}

export default Input