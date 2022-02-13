import { useRouter } from 'next/router';
import css from 'styles/Home.module.css';

import Button from 'components/common/Button';

export default function Home() {
	const router = useRouter();

	return (
		<div className={css.info_container_frtui}>
			<div className={css.sub_container_frtui}>
				<div className={css.content_frtui}>
					<div className={css.heading_frtui}>
						<h1>Pollify</h1>
					</div>
					<div className={css.tagline_frtui}>
						<p className={css.tagline_head_frtui}>
							Want a Voting System?!
						</p>
						<p className={css.tagline_text_frtui}>
							Check out Pollify where you can do create polls,
							comment on them, and vote on them.
						</p>
					</div>
					<div className={css.button_frtui}>
						<Button
							onClick={() => router.push('/signup')}
							label="Register"
						/>
					</div>
				</div>
				<div className={css.img_frtui}>
					<img src="./img.svg" alt="Landing Image" />
				</div>
			</div>
		</div>
	);
}
