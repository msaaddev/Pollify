import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// context
import { AppContext } from 'components/context/AppContext';

// components
import Nav from 'components/common/Nav';
import PollViewer from 'components/common/PollViewer';

// styles
import css from 'styles/Dashboard.module.css';

// firebase
import { doc, getDoc, getFirestore } from 'config/firebase';

const Dashboard = () => {
	const [render, setRender] = useState(false);
	const { allPolls, setAllPolls, setUserData } = useContext(AppContext);
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

			const db = getFirestore();
			const docRef = doc(db, 'allPolls', 'polls');
			getDoc(docRef).then(doc => {
				setAllPolls(doc.data());
				if (doc.data().pollList.length > 0) {
					setRender(true);
				}
			});
		}
	}, []);

	return (
		<>
			<Nav />
			<div className={css.container}>
				<div className={css.container}>
					<div className={css.sub_container}>
						<div className={css.tagline}>
							<h2>Here are all the polls</h2>
							<h3>Take a look!</h3>
						</div>
					</div>

					{render &&
						allPolls.pollList.map(poll => (
							<PollViewer
								key={Math.random() * 1000}
								name={poll.pollname}
								descripion={poll.description}
								options={poll.options}
								vote
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
