import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import 'react-popupbox/dist/react-popupbox.css';

// firebase
import {
	getAuth,
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
import css from 'styles/Signup.module.css';

const SignUp = () => {
	const { setUser } = useContext(AuthContext);
	const [code, setCode] = useState('');
	const [name, setName] = useState('');
	const [gender, setGender] = useState('Male');
	const [country, setCountry] = useState('');
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
	 * reset values of errors to empty string
	 */
	const clearErrs = () => {
		setErr('');
	};

	/**
	 *
	 *
	 * Sign in via phone number
	 */
	const handleLoginWithPhoneNum = e => {
		e.preventDefault();
		clearErrs();

		const appVerifier = window.recaptchaVerifier;

		signInWithPhoneNumber(auth, phoneNum, appVerifier)
			.then(confirmationResult => {
				openPopupbox();

				openPopupbox().then(() => {
					const code = document.getElementById('code').value;
					confirmationResult
						.confirm(code)
						.then(result => {
							const user = result.user;
							setUser(user);
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
	};

	return (
		<>
			<main className={css.container}>
				<Input
					htmlFor="name"
					label="Name"
					placeholder="Enter your name..."
					type="text"
					autoFocus={true}
					value={name}
					onChange={setName}
				/>
				<Input
					htmlFor="country"
					label="Country"
					placeholder="Enter your country..."
					type="text"
					value={country}
					onChange={setCountry}
				/>
				<Input
					htmlFor="phone_number"
					label="Phone Number"
					placeholder="Enter your phone number..."
					type="text"
					value={phoneNum}
					onChange={setPhoneNum}
				/>
				<Input
					label="Gender"
					value={gender}
					onChange={setGender}
					dropdown
				/>
				{err ? <p className={css.err}>{err}</p> : null}
				<div id="recaptcha-container"></div>
				<Button label="Sign Up" onClick={handleLoginWithPhoneNum} />
			</main>
			<PopupboxContainer {...popupboxConfig} />
		</>
	);
};

export default SignUp;
