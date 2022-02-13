import { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [allPolls, setAllPolls] = useState({ pollList: [] });
	const [userData, setUserData] = useState({ pollList: [] });

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
