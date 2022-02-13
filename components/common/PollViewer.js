import Button from './Button';
import css from 'styles/PollViewer.module.css';

const PollViewer = ({
	name,
	descripion,
	options,
	id,
	handleEdit,
	handleDelete,
	handleUpvote,
	vote = false
}) => {
	return (
		<div className={css.poll_container}>
			<h2>Name</h2>
			<p>{name}</p>
			<h2>Description</h2>
			<p>{descripion}</p>
			<h2>Options</h2>
			<form>
				{options.map(option => (
					<div key={Math.random() * 1000}>
						<input
							type="radio"
							value={option}
							name="option"
							id={option}
						/>
						<label htmlFor={option}>{option}</label>
						<br />
					</div>
				))}
			</form>
			<div className={css.btn_wrapper}>
				{vote ? (
					<>
						<Button optionBtn label="Upvote" />
						<Button optionBtn label="Downvote" />
					</>
				) : (
					<>
						<Button optionBtn label="Edit" onClick={handleEdit} />
						<Button
							optionBtn
							label="Delete"
							onClick={() => handleDelete(id)}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default PollViewer;
