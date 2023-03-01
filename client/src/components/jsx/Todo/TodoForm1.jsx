import '../../css/Todo.css';
import React, { useState } from 'react';

export function TodoForm(props) {
    const [title,setTitle] = useState(props.change ? props.change.value : '');
    const [description,setDescription] = useState(props.change ? props.change.value : '');
    const [input, setInputs] = useState({
        title:"",
        description:"",
        date:""
    })

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000),
            title: title,
            description: description,
            date: input.date
        });

        console.log(props)

        setTitle("");
        setDescription("");
        setInputs({
            title:"",
            description:"",
            date:""
        })
    };

    const inputChange = (e) => {
        setTitle(e.target.value)
        const newTasks = {...input}
        newTasks[e.target.id]=e.target.value
        setInputs(newTasks)
        console.log(input)
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
        const newTasks = {...input}
        newTasks[e.target.id]=e.target.value
        setInputs(newTasks)
        console.log(input)
    }

    const changeDate = (e) => {
        const newTasks = {...input}
        newTasks[e.target.id]=e.target.value
        setInputs(newTasks)
        console.log(input)
    }


    return (props.trigger) ? (
            <form 
                autoComplete='off'
                className='todo-form'
                onSubmit={handleSubmit}   
            >
                {props.change ? (
                    <>
                        <input 
                            placeholder = {title}
                            className = "New_Task"
                            type="text"
                            value={title}
                            // ref={inputRef}
                            onChange={inputChange}
                            id="title"
                            name="title"

                        />
                        <textarea
                            placeholder={description}
                            value={description}
                            onChange={descriptionChange}
                            id="description"
                            name="description"
                        />
                        <input name="date" onChange={changeDate} id="date" type="date" placeholder={input.date}></input>
                        <button className='todo-button'>Add</button>
                        
                    </>
                ) :
                <>
                    <input 
                        placeholder = "Enter new task"
                        className = "New_Task"
                        type="text"
                        value={title}
                        // ref={inputRef}
                        onChange={inputChange}
                        id="title"
                        name="title"

                    />
                    <textarea
                        placeholder='Description'
                        value={description}
                        onChange={descriptionChange}
                        id="description"
                        name="description"
                    />
                    <input name="date" onChange={changeDate} id="date" type="date"></input>
                    <button className='todo-button'>Add</button>
                    <button type="button" onClick={()=> props.setTrigger(false)}>Cancel</button>
                    </>
                }
                
            </form>
    ) : "";
}

export default TodoForm