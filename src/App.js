import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	// To do Items Data
	const [toDoItems, setToDoItems] = useState(
		localStorage.getItem('todoData')
			? JSON.parse(localStorage.getItem('todoData'))
			: []
	);

	const [addItem, setAddItem] = useState('');

	const [completedItems, setCompletedItems] = useState(
		localStorage.getItem('completedData')
			? JSON.parse(localStorage.getItem('completedData'))
			: []
	);

	// To handle delete/edit/add side effect that is not saving the last modified item
	useEffect(() => {
		localStorage.setItem('todoData', JSON.stringify(toDoItems));
		localStorage.setItem('completedData', JSON.stringify(completedItems));
	}, [toDoItems, completedItems]);

	const renderTodoItems = toDoItems.map((item) => {
		// Looping through data items and render the To do Items
		return (
			<div key={item.id}>
				<div className="todo-item">
					<input
						className="btn-checkbox"
						type="checkbox"
						onClick={() => {
							itemsHandler(item.id, item, setCompletedItems, setToDoItems);
						}}
					/>
					<input
						className="input-box-todo"
						defaultValue={item.task}
						type="text"
						disabled={item.isDisabled}
					/>
				</div>
				<div className="todo-buttons">
					{item.isEdit ? (
						<button
							className="item-btn save"
							onClick={() => {
								onEditHandler(item.id, setToDoItems);
							}}
						>
							Save
						</button>
					) : (
						<button
							className="item-btn edit"
							onClick={() => {
								onEditHandler(item.id, setToDoItems);
							}}
						>
							Edit
						</button>
					)}
					<button
						className="item-btn delete"
						onClick={() => {
							onDeleteHandler(item.id, setToDoItems);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		);
	});

	// Render Completed Items
	const renderCompletedItems = completedItems.map((item) => {
		return (
			<div key={item.id}>
				<div className="todo-item">
					<input
						className="btn-checkbox"
						type="checkbox"
						defaultChecked
						onClick={() => {
							itemsHandler(item.id, item, setToDoItems, setCompletedItems);
						}}
					/>
					<input
						className="input-box-todo completed"
						defaultValue={item.task}
						type="text"
						disabled={item.isDisabled}
					/>
				</div>
				<div className="todo-buttons">
					{item.isEdit ? (
						<button
							className="item-btn save"
							onClick={() => {
								onEditHandler(item.id, setCompletedItems);
							}}
						>
							Save
						</button>
					) : (
						<button
							className="item-btn edit"
							onClick={() => {
								onEditHandler(item.id, setCompletedItems);
							}}
						>
							Edit
						</button>
					)}
					<button
						className="item-btn delete"
						onClick={() => {
							onDeleteHandler(item.id, setCompletedItems);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		);
	});

	// Saving added item
	function onTypingHandler(e) {
		setAddItem(e.target.value);
	}

	// Updating items upon add
	function addItemHandler() {
		setToDoItems((prevState) => [
			...prevState,
			{
				id: Math.random().toString(36).slice(2),
				task: addItem,
				isCompleted: false,
				isEdit: false,
				isDisabled: true,
			},
		]);

		setAddItem('');
	}

	// Updating items between Todo and Completed
	function itemsHandler(id, arrItem, setterFunc, removerFunc) {
		setterFunc((prevState) => [
			...prevState,
			{ ...arrItem, isCompleted: true },
		]);
		removerFunc((prevState) => prevState.filter((item) => item.id !== id));
	}

	// Handling Delete BTN
	function onDeleteHandler(id, setterFunc) {
		setterFunc((prevState) => prevState.filter((item) => item.id !== id));
	}

	// Handing Edit BTN
	function onEditHandler(id, setterFunc) {
		setterFunc((prevState) =>
			prevState.map((updateTask) => {
				if (updateTask.id === id) {
					return {
						...updateTask,
						isDisabled: !updateTask.isDisabled,
						isEdit: !updateTask.isEdit,
					};
				} else {
					return updateTask;
				}
			})
		);
	}

	return (
		<div className="app">
			<div className="wrapper">
				<h1 className="app-title">Todo list</h1>
				<div className="app-addItem">
					<h3 className="item-heading">Add item</h3>
					<div className="addItem-container">
						<input
							className="input-box faded"
							type="text"
							value={addItem}
							onChange={onTypingHandler}
							placeholder="Add a task"
						/>
						<button className="btn" onClick={addItemHandler}>
							Add
						</button>
					</div>
				</div>
				<div className="items-container">
					<h3 className="item-heading">Todo</h3>
					{toDoItems.length === 0 ? (
						<h3 className="empty-list">Start Adding to-do tasks</h3>
					) : (
						renderTodoItems
					)}
				</div>
				<div className="items-container">
					<h3 className="item-heading">Completed</h3>
					{completedItems.length === 0 ? (
						<h3 className="empty-list">Do Something! 😑</h3>
					) : (
						renderCompletedItems
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
