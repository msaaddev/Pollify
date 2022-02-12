import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

// firebase
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	RecaptchaVerifier,
	signInWithPhoneNumber
} from 'config/firebase';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';

// context
import { AuthContext } from 'components/context/AuthContext';

// stylesheet
import css from 'styles/Auth.module.css';

const Login = () => {
	const [code, setCode] = useState();
	const { user, setUser } = useContext(AuthContext);
	const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
	const { phoneNum, setPhoneNum } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { phoneNumErr, setPhoneNumErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
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
						console.log('resolved');
						handleLoginWithPhoneNum();
					}
				},
				auth
			);
		}
		authListener();
	}, []);

	/**
	 *
	 *
	 * reset values of errors to empty string
	 */
	const clearErrs = () => {
		setEmailErr('');
		setPasswordErr('');
	};

	/**
	 *
	 *
	 * login to the existing account
	 */
	const handleLogin = () => {
		clearErrs();

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setPassword('');
				router.push('/');
			})
			.catch(err => {
				const { code, message } = err;

				if (
					code === 'auth/invalid-email' ||
					code === 'auth/user-disabled' ||
					code === 'auth/user-not-found'
				) {
					setEmailErr(message);
				}

				if (code === 'auth/wrong-password') {
					setPasswordErr(message);
				}
			});
	};

	/**
	 *
	 *
	 * Sign in via phone number
	 */
	const handleLoginWithPhoneNum = e => {
		e.preventDefault();
		const appVerifier = window.recaptchaVerifier;

		signInWithPhoneNumber(auth, phoneNum, appVerifier)
			.then(confirmationResult => {
				console.log('working');

				const otp = window.prompt(
					'Enter the code from the SMS message:'
				);
				confirmationResult
					.confirm(otp)
					.then(result => {
						// User signed in successfully.
						const user = result.user;
						console.log(user);
						// ...
					})
					.catch(error => {
						console.log(error);
						// User couldn't sign in (bad verification code?)
						// ...
					});
				window.confirmationResult = confirmationResult;
				// ...
			})
			.catch(error => {
				console.log(error);
				// Error; SMS not sent
				// ...
			});
	};

	/**
	 *
	 *
	 * check if user exists
	 */
	const authListener = () => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setPassword('');
				setUser(user);
			} else {
				setUser('');
			}
		});
	};

	return (
		<form className={css.container} onSubmit={handleLoginWithPhoneNum}>
			{/* <Input
				htmlFor="email"
				label="Email"
				type="text"
				autoFocus={true}
				value={email}
				onChange={setEmail}
				err={emailErr}
			/>
			<Input
				htmlFor="password"
				label="Password"
				type="password"
				autoFocus={false}
				value={password}
				onChange={setPassword}
				err={passwordErr}
			/> */}
			<Input
				htmlFor="phone_number"
				label="Phone Number"
				type="text"
				autoFocus={true}
				value={phoneNum}
				onChange={setPhoneNum}
				err={phoneNumErr}
			/>
			<Input
				htmlFor="code"
				label="Code"
				type="number"
				autoFocus={false}
				value={code}
				onChange={setCode}
				err={phoneNumErr}
			/>
			<div id="recaptcha-container"></div>
			<Button label="Login" onClick={handleLoginWithPhoneNum} />
		</form>
	);
};

export default Login;
