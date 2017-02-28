import React from 'react';

const Spinner = () => {
    return (
    	<div>
    		<div className="loading__message">
    			<span>Loading...</span>
    			<div className="spinner">
		          <div className="bounce1"></div>
		          <div className="bounce2"></div>
		          <div className="bounce3"></div>
		        </div>
    		</div>
		</div>
    )
};

export default Spinner;

