import css from 'styles/Button.module.css';

const Button = ({ label, onClick, optionBtn }) => {
	return (
		<>
			{optionBtn ? (
				<button className={css.optionBtn} onClick={onClick}>
					{label}
				</button>
			) : (
				<button className={css.button} onClick={onClick}>
					{label}
				</button>
			)}
		</>
	);
};

export default Button;
