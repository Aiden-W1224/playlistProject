'use client'
import Image from 'next/image'
import { authorize, getToken } from './lib/auth'
import styles from './ui/ColorBackground.module.css';
import ButtonOnClick from './ui/ButtonOnClick'

export default function Home() {
  return (
    <div className={styles.colorBackground}>
    <div className={styles.wavyLine}></div>
    <div className={styles.buttonContainer}>
      <ButtonOnClick onClick={authorize} label='Login With Spotify'/>
      <ButtonOnClick onClick={getToken} label='Get Token'/>
    </div>
  </div>
  )
} 