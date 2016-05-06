import React, {Component} from 'react'
import {connect} from 'react-redux'


const Wrapper = (props) => {
	return (
		<div>
			{props.children}
		</div>
	)
}

export default Wrapper
