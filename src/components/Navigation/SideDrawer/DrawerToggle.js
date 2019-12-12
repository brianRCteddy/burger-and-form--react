import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = (props) => (
	<div classes={classes.DrawerToggle} onClick={props.toggleClicked}>
		<div />
		<div />
		<div />
	</div>
);

export default DrawerToggle;
