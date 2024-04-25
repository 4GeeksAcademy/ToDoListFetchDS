import React, { useState, useEffect } from "react";


//Initializing Objects, Variables, & useStates:

const List = () => {
    //Dynamic Objects, Variables, & useStates:
    const [input, setInput] = useState("");
    const [choreList, setChoreList] = useState([]);

    let placeHolder = [];

    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/users/DMS")

            .then(resp => {
                if (!resp.ok) {
                    setChoreList(placeHolder);
                    createUser()
                } else {
                    return resp.json();
                }
                console.log(resp.ok); // Will be true if the response is successful
                console.log(resp.status); // The status code=200 or code=400 etc.
                console.log(resp.text()); // Will try to return the exact result as a string
                return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
            })
            .then(data => {
                if (!data) {
                    console.log("API data not found. Empty placeHolder used instead.")
                } else {
                    setChoreList(data.todos);
                    console.log(data.todos);
                    console.log("choreList console.log \n", choreList);
                }
                // Here is where your code should start after the fetch finishes
                console.log(data); // This will print on the console the exact object received from the server
            })
            .catch(error => {
                // Error handling
                console.error(error);
            });
    },[]);

    //Functions:
    const addChore = () => {
        let newTodoObject = {
            "is_done": false,
            // id: counter,
            "label": input
        };

        if (input.trim()) {
            fetch("https://playground.4geeks.com/todo/todos/DMS", {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'},
                body: JSON.stringify({
                    'label': input,
                    'is_done': false
                }) 
            })
            setChoreList([...choreList, newTodoObject]);
            setInput(""); // Clear the input after adding a chore
        }
    };

    const removeChore = () => {
        let newChoreList = choreList.slice(0, -1);
        setChoreList(newChoreList);
        console.log(newChoreList);
    }

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/DMS', {
            method:"POST"
        })
        .catch (error => {
            console.error(error);
        })
    }

    //Returns:
    return (
        <div>
            <input
                type="text"
                placeholder="Type chore here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addChore}>Add Chore</button>
            <button onClick={removeChore}>Remove Chore</button>
            <ul>
                {choreList.map((chore, index) => (
                    <li key={index}>{chore.label}</li>
                ))}
            </ul>
            {choreList.length == 0 ? <div>No tasks, add a task!</div> : null}
        </div>
    );
};

export default List;