import { AuthProvider } from 'components/context/AuthContext';
import { AppProvider } from 'components/context/AppContext';
import Layout from 'components/Layout';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<AuthProvider>
				<AppProvider>
					<Component {...pageProps} />
				</AppProvider>
			</AuthProvider>
		</Layout>
	);
}

export default MyApp;
