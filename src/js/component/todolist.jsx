import React , {useState, useEffect} from "react";

const Todos = () => {

    const [newInput, setNewInput] = useState("");
    const [newTodo, setNewTodo] = useState([]);

	function createUser(){
		var requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify([])
		}

		fetch("https://playground.4geeks.com/apis/fake/todos/user/amv87", requestOptions)
		.then(response => response.json())
	}

    function getTodos(){
        fetch("https://playground.4geeks.com/apis/fake/todos/user/amv87")
        .then(response => response.json())
        .then(data => setNewTodo(data)) 
    }

    function  createTodo(){
        var requestOptions = {
            method: 'PUT',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo.concat({ "label": newInput, "done": false }))
        }
            
        fetch("https://playground.4geeks.com/apis/fake/todos/user/amv87", requestOptions)
        .then(response => response.json())
        .then(() => getTodos())
        .then(setNewInput(''))
    }

    function deleteTodo(item){
        var requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo.filter(todo => todo !== item))
            }
            
            fetch("https://playground.4geeks.com/apis/fake/todos/user/amv87", requestOptions)
            .then(response => response.json())
            .then(() => getTodos())
    }
      
    useEffect (()=>{
        createUser()
        getTodos()
    } ,[])

	return (
		<>
			<div className="notepad">
				<h1 className="todos-title">to-do's</h1>
				<input
                    className="input-notes"
                    value={newInput}
                    onKeyDown={(e) => (e.keyCode === 13 && newInput !== '' ? createTodo(e) : null)} 
                    onChange={(e)=>setNewInput(e.target.value)}
                    placeholder={newTodo.length === 1 ? 'No tasks, add a task' : 'What needs to be done?'}
                />
				{newTodo.map((item) =>
                    <p className="element" key={item.id}>{item.label}<button className="x-button" onClick={()=>deleteTodo(item)}>⨉</button></p>
                )}
				<p className="footer">{newTodo.length} {newTodo.length !== 1 ? 'items' : 'item'} left</p>
       		</div>
			<div className="notepad1"></div>
			<div className="notepad2"></div>
		</>
	);
};

export default Todos;