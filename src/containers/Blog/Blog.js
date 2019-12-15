import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
//import axios from 'axios';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import classes from './Blog.css';

class Blog extends Component {
	render() {
		return (
			<div className={classes.Blog}>
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/"
									exact
									activeClassName="my-active"
									activeStyle={{
										color: '#fa923f',
										textDecoration: 'underline'
									}}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: '/new-post',
										hash: '#submit',
										search: 'quick-submit=true'
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					<Route path="/" exact component={Posts} />
					<Route path="/new-post" component={NewPost} />
					<Route path="/:id" exact component={FullPost} />
				</Switch>
			</div>
		);
	}
}

export default Blog;