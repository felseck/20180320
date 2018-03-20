import React from 'react'
import Files from './page.files'

export default React.createClass({

	getInitialState(){
		return {
			render:true
		}
	},

	
	

	render() {

	return (
		<Files props_={this.props} />
		);
	}
})
