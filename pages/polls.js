import Nav from 'components/common/Nav';
import PollViewer from 'components/common/PollViewer';
import css from 'styles/Polls.module.css';

// dummy data
import data from 'config/data';

const Polls = () => {
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
				{data.map(poll => (
					<PollViewer
						key={Math.random() * 1000}
						name={poll.name}
						descripion={poll.descripion}
						options={poll.options}
					/>
				))}
			</div>
		</>
	);
};

export default Polls;
