import React from 'react';
import burgerLogo from '../../assets/images/27.1 burger-logo.png.png';
import classes from './Logo.css';

const Logo = (props) => {
	return (
		<div className={classes.Logo} style={{ height: props.height }}>
			<img src={burgerLogo} alt="" />
		</div>
	);
};

export default Logo;
