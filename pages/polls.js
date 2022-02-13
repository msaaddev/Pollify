import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Nav from 'components/common/Nav';
import PollViewer from 'components/common/PollViewer';
import css from 'styles/Polls.module.css';

// dummy data
import { AppContext } from 'components/context/AppContext';

// firebase
import { doc, getDoc, getFirestore } from 'config/firebase';

const Polls = () => {
	const router = useRouter();
	const { userData, setUserData } = useContext(AppContext);
	const [render, setRender] = useState(false);

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

			const db = getFirestore();
			const docRef = doc(db, 'userData', data.phoneNum);
			getDoc(docRef).then(doc => {
				setUserData(doc.data());
				setRender(true);
			});
		}
	}, []);

	return (
		<>
			<Nav />
			<div className={css.container}>
				<div className={css.sub_container}>
					<div className={css.tagline}>
						<h2>Here are your polls</h2>
						<h3>Take a look!</h3>
					</div>
				</div>
				{render &&
					userData.pollList.map(poll => (
						<PollViewer
							key={Math.random() * 1000}
							name={poll.pollname}
							descripion={poll.description}
							options={poll.options}
						/>
					))}
			</div>
		</>
	);
};

export default Polls;
