import css from 'styles/Input.module.css';

const Input = ({
	id,
	htmlFor,
	label,
	type,
	autoFocus = false,
	value,
	onChange,
	err,
	placeholder,
	dropdown,
	textarea = false
}) => {
	return (
		<div className={css.wrapper}>
			{type !== 'radio' && <label htmlFor={htmlFor}>{label}</label>}
			<br />
			{dropdown ? (
				<select
					onChange={e => onChange(e.target.value)}
					className={css.input}
				>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			) : textarea ? (
				<textarea
					className={css.input}
					type={type}
					autoFocus={autoFocus}
					required
					value={value}
					placeholder={placeholder}
					onChange={e => onChange(e.target.value)}
				/>
			) : (
				<input
					className={css.input}
					id={id}
					type={type}
					autoFocus={autoFocus}
					required
					value={value}
					placeholder={placeholder}
					onChange={e => onChange(e.target.value)}
				/>
			)}
		</div>
	);
};

export default Input;
