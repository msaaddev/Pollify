import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import css from 'styles/Create.module.css';

// components
import Nav from 'components/common/Nav';
import PollForm from 'components/pollForm';

// context
import { AppContext } from 'components/context/AppContext';

const Create = () => {
	const { setUserData } = useContext(AppContext);
	const [pollname, setPollname] = useState('');
	const [description, setDescription] = useState('');
	const [options, setOptions] = useState([1, 2]);
	const [optionValues, setOptionValues] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== undefined) {
			let data = localStorage.getItem('user');
			data = JSON.parse(data);
			if (!data) {
				router.push('/login');
			}

			data = localStorage.getItem('userData');
			data = JSON.parse(data);
			setUserData(data);
		}
	}, []);

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
