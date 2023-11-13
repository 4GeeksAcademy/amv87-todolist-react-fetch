import React, { useState, useEffect } from "react";

const Todos = () => {
	
	const [newInput, setNewInput ] = useState('');
	const [newTodo, setNewTodo ] = useState([]);
	const [item, setItem ] = useState('items');
	const [notask, setNotask ] = useState(<p>No tasks. Add a task.</p>);

    function getTodos() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/amv87')
        .then((response)=>response.json())
        .then((data)=>getTodos(data.label))


    }
    useEffect(()=>{
        getTodos()
        console.log('se cargo el todo')
    })
	
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
				<input className="input-notes" value={newInput} onKeyDown={(e) => (e.keyCode === 13 ? addNewTodo(e) : null)} onChange={(e)=>setNewInput(e.target.value)} placeholder="What needs to be done?" type="text" />
				{notask}
				{newTodo.map((element, index) =><p className="element" key={index}>{element} <button className="x-button" onClick={()=>deleteTodo(index)} >⨉</button></p>)}
				<p className="footer">{newTodo.length} {item} left</p>
       		</div>
			<div className="notepad1"></div>
			<div className="notepad2"></div>
		</>
	);
};

export default Todos;