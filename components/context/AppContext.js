import { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [allPolls, setAllPolls] = useState([]);
	const [userData, setUserData] = useState([]);

	return (
		<AppContext.Provider
			value={{
				allPolls,
				setAllPolls,
				userData,
				setUserData
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
