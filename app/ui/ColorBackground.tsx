import React from 'react';
import styles from './ColorBackground.module.css';
import { authorize, getToken } from '../lib/auth';
const ColorBackground = () => {
  return (
    <div className={styles.colorBackground}>
      <div className={styles.wavyLine}></div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={authorize}>Login with Spotify</button>
        <button className={styles.button} onClick={getToken}>Get Token</button>
      </div>
    </div>
  );
};

export default ColorBackground;
