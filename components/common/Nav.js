import css from 'styles/Nav.module.css';
import Link from 'next/link';

import { getAuth, signOut } from 'config/firebase';
import { useRouter } from 'next/router';

import { useContext } from 'react';

import { AuthContext } from 'components/context/AuthContext';

const Nav = () => {
	const router = useRouter();

	const { setUser } = useContext(AuthContext);

	/**
	 *
	 *
	 * sign out user
	 */
	const handleSignOut = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				localStorage.removeItem('user');
				setUser('');
				router.push('/login');
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div className={css.container}>
			<div className={css.logo}>
				<img src="/polling.png" alt="logo" />
				<h2>Pollify</h2>
			</div>
			<div className={css.options}>
				<Link href="/dashboard">
					<a>
						<p className={css.para_option}>All Poll</p>
					</a>
				</Link>
				<Link href="/polls">
					<a>
						<p className={css.para_option}>My Poll</p>
					</a>
				</Link>
				<Link href="/create">
					<a>
						<p className={css.para_option}>Create Poll</p>
					</a>
				</Link>
				<p className={css.para_option} onClick={handleSignOut}>
					Logout
				</p>
			</div>
		</div>
	);
};

export default Nav;
