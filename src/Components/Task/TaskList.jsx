
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/constants';


const Task = ({ todo, index, editTodo, deleteTodo, toggleComplete, moveTodo }) => {
	const [, ref] = useDrag({
		type: ItemTypes.TODO,
		item: { index },
	});

	const [, drop] = useDrop({
		accept: ItemTypes.TODO,
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				moveTodo(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
	});

	return (
		<div ref={(node) => ref(drop(node))}>
			<li className='task__item' key={todo.id}>
				<div className='flex__wrap'>
					<div className='checkbox__wrapper-19'>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => toggleComplete(todo.id)}
						id={todo.id}
					/>
						<label className='check__box' for={todo.id}></label>
					</div>
				<span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
				</div>
				<button className='task__btn' onClick={() => editTodo(todo.id, prompt('Редактировать:', todo.text))}>
					<FontAwesomeIcon icon={faPencil} />
				</button>
				<button className='task__btn' onClick={() => deleteTodo(todo.id)}>
					<FontAwesomeIcon icon={faTrashCan} />
				</button>
			</li>
		</div>
	);
};


const TaskList = ({ todos, editTodo, deleteTodo, toggleComplete, moveTodo }) => {
	return (
		<ol>
			{todos.map((todo, index) => (
				<Task
					key={todo.id}
					todo={todo}
					index={index}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
					toggleComplete={toggleComplete}
					moveTodo={moveTodo}
				/>
			))}
		</ol>
	);
};

export default TaskList;