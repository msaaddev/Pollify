import { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [allPolls, setAllPolls] = useState([]);

	return (
		<AppContext.Provider
			value={{
				allPolls,
				setAllPolls
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
