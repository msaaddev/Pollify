import { useState } from 'react';
import css from 'styles/Create.module.css';

// components
import Nav from 'components/common/Nav';
import PollForm from 'components/pollForm';

const Create = () => {
	const [pollname, setPollname] = useState('');
	const [description, setDescription] = useState('');
	const [options, setOptions] = useState([1, 2]);
	const [optionValues, setOptionValues] = useState([]);

	return (
		<>
			<Nav />
			<div className={css.container}>
				<div className={css.sub_container}>
					<div className={css.tagline}>
						<h2>Do You Want To Create A Poll?</h2>
						<h3>Fill the form bellow</h3>
					</div>
					<div className={css.form}>
						<div className={css.form_section_btns}>
							<div
								className={`${css.create_job} + ${css.border}`}
							>
								<h3>Create Poll</h3>
							</div>
						</div>

						<PollForm
							pollname={pollname}
							description={description}
							options={options}
							optionValues={optionValues}
							setPollname={setPollname}
							setDescription={setDescription}
							setOptions={setOptions}
							setOptionValues={setOptionValues}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Create;
