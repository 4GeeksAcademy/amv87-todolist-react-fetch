import React, { useState, useEffect } from "react";

const Todos = () => {
	
	const [ newInput, setNewInput ] = useState('');
	const [ newTodo, setNewTodo ] = useState([]);
	const [ item, setItem ] = useState('items');
	const [ notask, setNotask ] = useState(<p>No tasks. Add a task.</p>);


	function getData() {
		const requestGet = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			redirect: 'follow'
		};
		fetch('https://playground.4geeks.com/apis/fake/todos/user/amv87', requestGet)
			.then(response => response.json())
			.then((data) => console.log(data[0].label))
			.then((data) => addNewTodo(data))
	}
	

    useEffect(()=>{
		getData()
    }, [])
	
	function addNewTodo() {
		setNewTodo(newTodo.concat(newInput))
		setNewInput('')
		if (newTodo.length === 0) {
			setItem('item')
			setNotask ('')
		} else {
			setItem('items')
			setNotask ('')
		}
	}

	const deleteTodo = (index) => {
		const eraseTodo = newTodo.filter((_, i) => i !== index);
		setNewTodo(eraseTodo);
		if (newTodo.length === 2) {
			setItem('item')
		} else if (newTodo.length === 1) {
			setNotask (<p>No tasks. Add a task.</p>)
			setItem('items')
		} else {
			setItem('items')
		}
	};

	return (
		<>
			<div className="notepad">
				<h1 className="todos-title">to-do's</h1>
				<input className="input-notes" value={newInput} onKeyDown={(e) => (e.keyCode === 13 && newInput !== '' ? addNewTodo(e) : null)} onChange={(e)=>setNewInput(e.target.value)} placeholder="What needs to be done?" type="text" />
				{notask}
				{newTodo.map((element, index) =><p className="element" key={index}>{element} <button className="x-button" onClick={()=>deleteTodo(index)}>⨉</button></p>)}
				<p className="footer">{newTodo.length} {item} left</p>
				<button onClick={()=>getData()}></button>
       		</div>
			<div className="notepad1"></div>
			<div className="notepad2"></div>
		</>
	);
};

export default Todos;