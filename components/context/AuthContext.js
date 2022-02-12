import { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNum, setPhoneNum] = useState('');
	const [phoneNumErr, setPhoneNumErr] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				email,
				setEmail,
				password,
				setPassword,
				phoneNum,
				setPhoneNum,
				phoneNumErr,
				setPhoneNumErr,
				emailErr,
				setEmailErr,
				passwordErr,
				setPasswordErr
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
