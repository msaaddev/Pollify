import Link from 'next/link';
import css from 'styles/HelperMsg.module.css';

const HelperMsg = ({ content, option, url }) => {
	return (
		<div className={css.container}>
			<p>
				{content}{' '}
				<span>
					<Link href={`/${url}`}>
						<a>{option}</a>
					</Link>
				</span>
			</p>
		</div>
	);
};

export default HelperMsg;
