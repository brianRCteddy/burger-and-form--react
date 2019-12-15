import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import classes from './Posts.css';

class Posts extends Component {
	state = {
		posts: []
	};

	componentDidMount() {
		axios
			.get('/posts')
			.then((response) => {
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map((post) => {
					return {
						...post,
						author: 'Ted'
					};
				});
				this.setState({ posts: updatedPosts });
				//console.log(updatedPosts);
			})
			.catch(
				(error) => console.log(error)
				//this.setState({ error: true })
			);
	}

	postSelectedHandler = (id) => {
		//this.props.history.push({ pathname: '/' + id });
		this.props.history.push('/' + id);
	};

	render() {
		let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
		if (!this.state.error) {
			posts = this.state.posts.map((post) => {
				return (
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => {
							this.postSelectedHandler(post.id);
						}}
					/>
				);
			});
		}

		return (
			<div>
				<section className={classes.Posts}>{posts}</section>;
				<Route path="/:id" component={FullPost} />
			</div>
		);
	}
}

export default Posts;
//Removed to Programatically link
//<Link to={'/' + post.id} key={post.id}>
//</Link>
