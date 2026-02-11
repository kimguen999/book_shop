import React from 'react'
import styles from './Input.module.css'

const Input = ({
  type='text'
  , value
  , ...props
}) => {
  return (
    <>
      <input
        type={type} 
        value={value || ''}
        className={styles.input}
        {...props}
      />
    </>
  )
}

export default Input