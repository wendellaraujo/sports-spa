import React from 'react';

const Card = (props) => {
	return (
		<div className={`card ${props.sizeCard}`}>
			<div className="card-body">
				{props.children}
			</div>
		</div>
	);
}

export default Card;
