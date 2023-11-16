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
		<button className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition duration-300 ease-in-out"
		 	onClick={onClickFunc}>{btnLabel}
		 </button>
	)
}