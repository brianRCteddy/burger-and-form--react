import React from 'react';
//import { withRouter } from 'react-router-dom';

import classes from './Post.css';

const Post = (props) => (
	<article className={classes.Post} onClick={props.clicked}>
		<h1>{props.title}</h1>
		<div className="Info">
			<div className={classes.Author}>{props.author}</div>
		</div>
	</article>
);

export default Post;