import { useContext } from 'react';

// context
import { AppContext } from 'components/context/AppContext';

// components
import Nav from 'components/common/Nav';
import PollViewer from 'components/common/PollViewer';

// styles
import css from 'styles/Dashboard.module.css';

const Dashboard = () => {
	const { allPolls } = useContext(AppContext);

	return (
		<>
			<Nav />
			<div className={css.container}>
				<div className={css.container}>
					<div className={css.sub_container}>
						<div className={css.tagline}>
							<h2>Here are your polls</h2>
							<h3>Take a look!</h3>
						</div>
					</div>

					{allPolls.map(poll => (
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
