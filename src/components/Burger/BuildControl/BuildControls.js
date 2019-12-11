import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				ingredientLabel={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		))}
	</div>
);

export default BuildControls;
