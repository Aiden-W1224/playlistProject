'use client'
import Image from 'next/image'
import { authorize, getToken } from './lib/auth'
import styles from './ui/ColorBackground.module.css';
import AuthButton from './ui/AuthButton'

export default function Home() {
  return (
    <div className={styles.colorBackground}>
    <div className={styles.wavyLine}></div>
    <div className={styles.buttonContainer}>
      <AuthButton />
    </div>
  </div>
  )
} 