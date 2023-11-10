'use client'
import Image from 'next/image'
import { authorize, getToken } from './lib/auth'
import styles from './ui/ColorBackground.module.css';
import ButtonOnClick from './ui/ButtonOnClick'

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code')!;
  let onclickFunc = authorize;
  let btnLabel = 'Login With Spotify'
  if (code !== null) {
    onclickFunc = getToken;
    btnLabel = 'Get Token'
  }
  return (
    <div className={styles.colorBackground}>
    <div className={styles.wavyLine}></div>
    <div className={styles.buttonContainer}>
      <ButtonOnClick onClick={onclickFunc} label={btnLabel}/>
    </div>
  </div>
  )
} 