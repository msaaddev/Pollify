import css from 'styles/Nav.module.css';
import Link from 'next/link';

const Nav = () => {
	return (
		<div className={css.container}>
			<div className={css.logo}>
				<img src="/polling.png" alt="logo" />
				<h2>Pollify</h2>
			</div>
			<div className={css.options}>
				<Link href="/create">
					<a className={css.option}>Create Poll</a>
				</Link>
				<Link href="/login">
					<a className={css.option}>Logout</a>
				</Link>
			</div>
		</div>
	);
};

export default Nav;
