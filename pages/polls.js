import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Nav from 'components/common/Nav';
import PollViewer from 'components/common/PollViewer';
import css from 'styles/Polls.module.css';

// dummy data
import { AppContext } from 'components/context/AppContext';

// firebase
import { getFirestore, updateDoc, doc, getDoc } from 'config/firebase';

const Polls = () => {
	const router = useRouter();
	const { userData, setUserData, allPolls, setAllPolls } =
		useContext(AppContext);
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

	/**
	 *
	 *
	 * handles delete
	 */
	const handleDelete = async id => {
		let firstIndex;
		let secondIndex;
		for (let i = 0; i < userData.pollList.length; i++) {
			if (userData.pollList[i].id === id) {
				firstIndex = i;
				break;
			}
		}

		for (let i = 0; i < allPolls.pollList.length; i++) {
			if (allPolls.pollList[i].id === id) {
				secondIndex = i;
				break;
			}
		}

		const firstTemp = { ...userData };
		firstTemp.pollList.splice(firstIndex, 1);

		const secondTemp = [...allPolls.pollList];
		secondTemp.splice(secondIndex, 1);

		setUserData(firstTemp);
		setAllPolls(secondTemp);

		try {
			const db = getFirestore();
			let data = doc(db, 'userData', userData.phoneNum);
			await updateDoc(data, {
				pollList: firstTemp
			});

			data = doc(db, 'allPolls', 'polls');
			await updateDoc(data, {
				pollList: secondTemp
			});
		} catch (err) {
			console.log(err);
		}
	};

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
				{console.log(userData)}
				{render &&
					userData.pollList.length > 0 &&
					userData.pollList.map(poll => (
						<PollViewer
							key={poll.id}
							handleDelete={handleDelete}
							id={poll.id}
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
