import { useState } from 'react';

const TaskForm = ({ addTodo }) => {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim() !== '') {
			addTodo(text);
			setText('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className='task__input'
				type="text"
				required
				placeholder="Введите задачу..."
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button type="submit">Добавить задачу</button>
		</form>
	);
};

export default TaskForm;