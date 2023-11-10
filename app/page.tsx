'use client'
import Image from 'next/image'
import { authorize, getToken } from './lib/auth'
import styles from './ui/ColorBackground.module.css';

export default function Home() {
  return (
    <div className={styles.colorBackground}>
    <div className={styles.wavyLine}></div>
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={authorize}>Login with Spotify</button>
      <button className={styles.button} onClick={getToken}>Get Token</button>
    </div>
  </div>
  )
    
}
