import React, {Component} from 'react'
import {Link} from 'react-router'

const Sidebar = (props) => {

	const links = [
		{title: 'Posts', url: '/posts'},
		{title: 'Settings', url: '/settings'},
	]

	return (
		<div className="Sidebar">
			<ul className="Sidebar__links">
				{links.map(link => (
					<li className="Sidebar__item">
						<Link to={link.url}>{link.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Sidebar
