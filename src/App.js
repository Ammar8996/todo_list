import React, { useState } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewToDo = () => {
    if (!newTodoTitle || !newDescription) {
      alert("Title and Description are required!");
      return;
    }
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoObj);
    setAllTodos(updatedTodoArr);
  };



  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index);
    setCompletedTodos(reducedCompletedTodos);
  };
/* handling the completed as to delete the item from all todos and completed both */
  const handleComplete = (index) => {


    let filteredTodo = {
      ...allTodos[index],

    };



    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    handleToDoDelete(index);
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    setNewTodoTitle("");
    setNewDescription("");
  }


  return (
    
    <div  >
      
    <div>
    <h1 class=" font-calibri font-bold mt-8 text-4xl text-center">My Todos</h1>
    </div>
      
      <div class="flex flex-col items-center mt-8">
      <div class="h-72 w-96 bg-[#879989]">
        <form onSubmit={handleSubmit}>
          <div className='inside-setting' class="flex flex-row">
          <div className='button-area' class="ml-4 mt-4 pt-4">
            <div className='title-label'>
          <label class="ml-1 mt-4 mb-2 text-md font-bold">Title:</label><br/>
          <input class="mt-3 placeholder:text-gray-500 pl-[6px] focus:outline-black border border-gray-500 rounded-xl h-10"
            type="text"
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)}
            placeholder="Task Title?"
          /><br />
          </div>
          <div className='description-label'class="mt-3">
          <label class="ml-1 mt-4 text-md font-bold text-black">Description:</label><br />
          <input class="mt-3 placeholder:text-gray-500 pl-[6px] focus:outline-black border border-gray-500 rounded-xl h-10 "
            type="text"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            placeholder="What's the description of your Task?"
          /><br />
          </div>
          <div className='add-btn' >
          <button class="mt-6 ml-6 bg-[#90661F] text-white text-center w-32 h-12  font-bold border border-gray-500 rounded-2xl"
            onClick={handleAddNewToDo}
          >
            Add
          </button>
          </div>
          </div>
          <div className="drop=down" class="mt-9 ml-16 ">
            <select class="h-8 rounded"
              
              value={isCompletedScreen ? "true" : "false"}
              onChange={(e) => setIsCompletedScreen(e.target.value === "true")}
            >
              <option value="false">To Do</option>
              <option value="true">Completed</option>
            </select>
          </div>
          </div>
        </form>
      </div>


      </div>

      {/* All todo list */}
      <div class=" flex flex-col items-center mt-4" >  
        {isCompletedScreen === false && allTodos.map((item, index) => (
          <div class=" mb-4 h-auto w-96 bg-[#AAB050] flex flex-row" style={{ order: -index }} key={index}>
            <div class=" ml-4 w-60 mb-2">
              <h2 class="mt-2 font-bold text-2xl">{item.title}</h2>
              <p class="mt-2">{item.description}</p>

            </div>
            <div className='icon-area'class="flex flex-row ">
            <div className='delete-icon'class=" ml-12 mt-8 ">
              <AiOutlineDelete 
                title="Delete?"
                className="icon text-2xl fill-blue-800"
                onClick={() => handleToDoDelete(index)}
              />
              </div>
              <div className='completed-icon'class="ml-4 mt-8">
              <BsCheckLg 
                title="Completed?"
                className=" check-icon text-2xl fill-green-800"
                onClick={() => handleComplete(index)}
              />
            </div>
            </div>
          </div>
        ))}

                {/* Completed todo list */}
        {isCompletedScreen === true && completedTodos.map((item, index) => (
          <div className="todo-list-item" class="mb-4 h-auto w-96 bg-[#AAB050] flex flex-row" style={{ order: -index }} key={index}>
            <div class=" ml-4 w-60 mb-2">
              <h2 class="mt-2 font-bold text-2xl">{item.title}</h2>
              <p class="mt-2">{item.description}</p>
            </div>
            <div class="ml-20 mt-8 ">
              <AiOutlineDelete
                className="icon text-2xl font-bold fill-blue-800"
                onClick={() => handleCompletedTodoDelete(index)}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;