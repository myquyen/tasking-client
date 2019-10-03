import React from 'react';
import { UncontrolledTooltip, Badge } from 'reactstrap'
import Share from 'components/ShareProject';
import TodoItem from 'components/Todo';
import MultiSelect from 'components/MultiSelect';

function Todos(props) {
	const id = props.match.params.id;
	const data = props.data;
	let todos, header, project;
	try {
		if (id) {
			// try {
			project = data.projects.filter(p => p.id === parseInt(id))[0] || data.shared_projects.filter(p => p.id === parseInt(id))[0]
			todos = project.todos;
			let collabs = project.collaborators.length;
			header = (
				<div className='d-flex align-items-baseline'>
					<h3 className='mb-3'><strong>{project.name.toUpperCase()}</strong></h3>
					{collabs > 0 ? <>
						<small className='ml-3'>Shared with <Badge id="sharing" className='mx-1' pill>{collabs}</Badge></small>
						<small><a>Change</a></small>
						<UncontrolledTooltip placement="bottom" target="sharing">
							{project.collaborators.map(item => item.name)}
						</UncontrolledTooltip> </>
						: null}
					<Share project_id={project.id} {...props} className='ml-auto' />
				</div>)
			// } catch {
			// 	todos = null
			// }
		} else if (props.match.path.includes('today')) {
			todos = data.today
			header = <h3 className='mb-3'><strong>{'today'.toUpperCase()}</strong></h3>
		} else if (props.match.path.includes('search')) {
			let key = props.match.params.key;
			todos = data.todos.filter(item => item.content.includes(key))
			header = <h3 className='mb-3'><strong>{'search results'.toUpperCase()} for "{key}"</strong></h3>
		}
		return (<>
			{header}
			{todos && todos.map(todo => <TodoItem todo={todo} {...props} project={project} />)}</>
		)
	}
	catch {
		return <h2> Can't find project '{project.name}'</h2>;
	}
}

export default Todos;