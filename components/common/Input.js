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
	dropdown
}) => {
	return (
		<div className={css.wrapper}>
			<label htmlFor={htmlFor}>{label}</label>
			<br />
			{dropdown ? (
				<select onChange={e => onChange(e.target.value)}>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			) : (
				<>
					<input
						id={id}
						type={type}
						autoFocus={autoFocus}
						required
						value={value}
						placeholder={placeholder}
						onChange={e => onChange(e.target.value)}
					/>
				</>
			)}
		</div>
	);
};

export default Input;
