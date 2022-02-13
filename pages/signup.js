import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import 'react-popupbox/dist/react-popupbox.css';

// firebase
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	getFirestore,
	setDoc,
	doc,
	getDoc
} from 'config/firebase';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import HelperMsg from 'components/common/HelperMsg';

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
		const db = getFirestore();
		const appVerifier = window.recaptchaVerifier;

		if (phoneNum !== '') {
			const docRef = doc(db, 'userData', phoneNum);
			getDoc(docRef).then(doc => {
				const userExists = doc.exists();
				if (!userExists) {
					signInWithPhoneNumber(auth, phoneNum, appVerifier)
						.then(confirmationResult => {
							// get code from user
							openPopupbox().then(() => {
								const code =
									document.getElementById('code').value;
								confirmationResult
									.confirm(code)
									.then(result => {
										const user = result.user;
										setUser(user);

										setDoc(doc(db, 'userData', phoneNum), {
											name,
											gender,
											phoneNum,
											pollList: []
										})
											.then(() => {
												router.push('/dashboard');
											})
											.catch(err => {
												console.log(err);
											});
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
					setErr(
						'User already exists. Try changing the phone number.'
					);
				}
			});
		}
	};

	return (
		<div className={css.container}>
			<div className={css.left_container}>
				<h2>
					<span>
						Register <br />
					</span>{' '}
					Yourself
				</h2>
				<p>
					Capture feedback and make decisions online with the Pollify
					app. Pollify allows you to create and conduct fun polls,
					cast votes for your favourite ideas and start discussions
					with people from all over the web. All just one click away.
					Get yourself registered to use the app.
				</p>
			</div>
			<div className={css.right_container}>
				<div className={css.top}>
					<img src="/polling.png" alt="logo" />
					<h2>Pollify</h2>
				</div>
				<div className={css.wrapper}>
					<h2 className={css.heading}>Create an Account</h2>
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
					<Button label="Sign Up" onClick={handleLoginWithPhoneNum} />
					{err ? <p className={css.err}>{err}</p> : null}
					<div id="recaptcha-container"></div>
					<HelperMsg
						content="Already have an account?"
						option="Sign in"
						url="login"
					/>
				</div>
			</div>
			<PopupboxContainer {...popupboxConfig} />
		</div>
	);
};

export default SignUp;
