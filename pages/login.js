import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import 'react-popupbox/dist/react-popupbox.css';

// firebase
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	getDoc,
	doc,
	getFirestore
} from 'config/firebase';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import HelperMsg from 'components/common/HelperMsg';

// context
import { AuthContext } from 'components/context/AuthContext';
import { AppContext } from 'components/context/AppContext';

// stylesheet
import css from 'styles/Login.module.css';

const Login = () => {
	const { setUser } = useContext(AuthContext);
	const { setUserData } = useContext(AppContext);
	const [code, setCode] = useState('');
	const [phoneNum, setPhoneNum] = useState('');
	const [err, setErr] = useState('');
	const router = useRouter();
	const auth = getAuth();
	auth.useDeviceLanguage();

	useEffect(() => {
		if (typeof window !== undefined) {
			// setting up captcha
			window.recaptchaVerifier = new RecaptchaVerifier(
				'recaptcha-container',
				{
					size: 'invisible',
					callback: response => {
						handleLoginWithPhoneNum();
					}
				},
				auth
			);
		}
	}, []);

	// popup Box Body
	const openPopupbox = () => {
		const promise = new Promise((resolve, reject) => {
			const closeBox = () => {
				resolve();
				PopupboxManager.close();
			};

			const content = (
				<>
					<Input
						id="code"
						htmlFor="code"
						label="Code"
						type="number"
						autoFocus={true}
						onChange={setCode}
					/>
					<Button label="Enter" onClick={closeBox} />
				</>
			);

			PopupboxManager.open({ content });
		});

		return promise;
	};

	// popup box configs
	const popupboxConfig = {
		fadeIn: true,
		fadeInSpeed: 200,
		overlayOpacity: 0.5
	};

	/**
	 *
	 *
	 * Sign in via phone number
	 */
	const handleLoginWithPhoneNum = e => {
		e.preventDefault();
		setErr('');
		const db = getFirestore();
		const appVerifier = window.recaptchaVerifier;

		if (phoneNum !== '') {
			const docRef = doc(db, 'userData', phoneNum);
			getDoc(docRef).then(doc => {
				const userExists = doc.exists();
				if (userExists) {
					signInWithPhoneNumber(auth, phoneNum, appVerifier)
						.then(confirmationResult => {
							openPopupbox().then(() => {
								const code =
									document.getElementById('code').value;
								confirmationResult
									.confirm(code)
									.then(result => {
										const user = result.user;
										setUser(user);
										setUserData(doc.data());
										localStorage.setItem(
											'userData',
											JSON.stringify(doc.data())
										);
										localStorage.setItem(
											'user',
											JSON.stringify(user)
										);
										router.push('/dashboard');
									})
									.catch(err => {
										setErr(JSON.stringify(err.code));
									});
							});

							window.confirmationResult = confirmationResult;
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					setErr('User does not exist. Sign up first.');
				}
			});
		}
	};

	return (
		<div className={css.container}>
			<div className={css.left_container}>
				<div className={css.top}>
					<img src="/polling.png" alt="logo" />
					<h2>Pollify</h2>
				</div>
				<div className={css.wrapper}>
					<h2 className={css.heading}>Log into Existing Account</h2>
					<Input
						htmlFor="phone_number"
						label="Phone Number"
						placeholder="Enter your phone number..."
						type="text"
						value={phoneNum}
						onChange={setPhoneNum}
					/>
					<div id="recaptcha-container"></div>
					<Button label="Login" onClick={handleLoginWithPhoneNum} />

					{err ? <p className={css.err}>{err}</p> : null}
					<div id="recaptcha-container"></div>
					<HelperMsg
						content="Don't have an account?"
						option="Register"
						url="signup"
					/>
				</div>
			</div>
			<div className={css.right_container}></div>
			<PopupboxContainer {...popupboxConfig} />
		</div>
	);
};

export default Login;
