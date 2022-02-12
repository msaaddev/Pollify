import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import css from 'styles/PollForm.module.css';

const PollForm = ({
	pollname,
	description,
	options,
	optionValues,
	setPollname,
	setDescription,
	setOptions,
	setOptionValues
}) => {
	const [option, setOption] = useState('');
	const router = useRouter();

	/**
	 *
	 *
	 * set value of options
	 */
	const hanldeCreatePoll = () => {
		let optionsArr = [];

		options.map(option => {
			const value = document.getElementById(`id_${option}`).value;
			optionsArr.push(value);
		});

		const temp = [...optionValues];

		for (let i = 0; i < optionsArr.length; i++) {
			if (temp.indexOf(optionsArr[i]) === -1) {
				temp.push(optionsArr[i]);
			}
		}

		setOptionValues(temp);
		router.push('/dashboard');
	};

	/**
	 *
	 *
	 * create new option ui
	 */
	const createOption = () => {
		const temp = [...options];
		temp.push(options.length + 1);
		setOptions(temp);
	};

	return (
		<div className={css.field_container}>
			<p>1. Poll Information</p>
			<div className={css.fields}>
				<Input
					htmlFor="poll_name"
					label="Name"
					type="text"
					autoFocus={true}
					value={pollname}
					onChange={setPollname}
					placeholder="Enter poll name..."
				/>
				<Input
					htmlFor="poll_description"
					label="Description"
					type="text"
					textarea
					value={description}
					onChange={setDescription}
					placeholder="Enter poll description..."
				/>
			</div>
			<hr />
			<p>2. Poll Options</p>
			<div className={css.fields}>
				{options.map((option, index) => (
					<Input
						key={index}
						htmlFor="poll_options"
						label={`Option ${option}`}
						type="text"
						onChange={setOption}
						id={`id_${option}`}
					/>
				))}
			</div>
			<div className={css.optionBtn}>
				<Button label="New Option" onClick={createOption} optionBtn />
			</div>
			<hr />
			<p>3. All done</p>
			<div className={css.btn}>
				<Button label="Create Poll" onClick={hanldeCreatePoll} />
			</div>
		</div>
	);
};

export default PollForm;