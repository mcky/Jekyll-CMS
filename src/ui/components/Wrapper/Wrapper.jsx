import React, {Component} from 'react'

import Sidebar from '../Sidebar'


const Wrapper = (props) => {
	return (
		<div className="App">

			<Sidebar />

			<div className="MainWrap">
				<main className="Main">
					{props.children}
				</main>
			</div>

		</div>
	)
}

export default Wrapper
