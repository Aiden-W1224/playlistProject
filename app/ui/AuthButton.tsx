'use client'
import styles from './ColorBackground.module.css';
import { authorize, getToken } from '../lib/auth';

export default function AuthButton() {
	const urlParams = new URLSearchParams(window.location.search);
	let code = urlParams.get('code');
	let onClickFunc = authorize;
	let btnLabel = 'Login With Spotify';
	if (code !== null) {
		onClickFunc = getToken;
		btnLabel = 'Get Token';
	}
	return (
		<button className={styles.button} onClick={onClickFunc}>{btnLabel}</button>
	)
}