import React from 'react'
import styles from './Button.module.css'

export default function Button({
  name,
  onClick,
  backgroundColor,
}) {
  return <button className={styles.button} onClick={onClick} style={{ backgroundColor }}>{name}</button>
}