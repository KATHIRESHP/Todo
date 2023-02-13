import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'

function App() {

  const[isCompleteScreen, setIsCompleteScreen] = useState(false);
  const[allTodos, setallTodos] = useState([])
  const[newTitle, setNewTitle] = useState("")
  const[newDes, setNewDes] = useState("")
  const[completedTodos, setCompletedTodos] = useState([])

  const handleAddBtn = () =>{
    let newTodoTitle ={
      title: newTitle,
      descrip: newDes
    }

    let updatedTodoArray = [...allTodos];
    updatedTodoArray.push(newTodoTitle);
    setallTodos(updatedTodoArray);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArray))
  }


  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index, 1)
    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
    setallTodos(reducedTodo)
  }

  const handleCompleteDeleteTodo = (index) => {
    let reducedTodo = [...completedTodos]
    reducedTodo.splice(index)
    localStorage.setItem('comletedlist', JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + '  '+h+':' + m + ':' + s;
    let filterItem = {
      ...allTodos[index],
      completedOn:completedOn
  }
  let updatedCompleteArray = [...completedTodos];
  updatedCompleteArray.push(filterItem);
  setCompletedTodos(updatedCompleteArray);
  handleDeleteTodo(index);
  localStorage.setItem('completedlist', JSON.stringify(updatedCompleteArray))
  }

useEffect(() => {
  let savedTodo = JSON.parse(localStorage.getItem('todolist'))
  let savedCompletedTodo = JSON.parse(localStorage.getItem('completedlist'))

  if(savedTodo){
    setallTodos(savedTodo); 
  }
  if(savedCompletedTodo){
    setCompletedTodos(savedCompletedTodo);
  }
}, []);

  return (
    <div className="App">
      <div className='Project-title'><h1>My Todo List</h1></div>
      <div className='todo-wrapper'>
          <div className='todo-input'>
              <div className='input-item'>
                  <label>Task</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter that you will never let not done!"/>
              </div>
              <div className='input-item'>
                    <label>Write About the Task!</label>
                    <input type="text" value={newDes} onChange={(e) => setNewDes(e.target.value)} placeholder="Description"/>
              </div>
              <div className='input-item'>
                    <button type='button' onClick={handleAddBtn} className='primaryBtn'>Add</button>
                </div>
          </div>

          <div className='btn-area'>
              <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
                    onClick={()=>setIsCompleteScreen(false)}
                    >Todo</button>
              <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
              onClick={()=>setIsCompleteScreen(true)}
              >
              Completed</button>
          </div>

          <div className='todo-list'>
             {isCompleteScreen===false &&  allTodos.map((item, index) => {
              return(
                <div className='todo-list-item' key = {index}>
                  <div className='first-half'>
                      <h3>{item.title}</h3>
                      <p>{item.descrip}</p>
                  </div>
                  <div>
                      <AiOutlineDelete 
                      onClick={()=>handleDeleteTodo(index)} 
                      className='icon'/>
                      <BsCheckLg 
                      onClick={() => handleComplete(index)} 
                      className='check-icon'/>
                  </div>
                </div>
              )
             })}

             {isCompleteScreen===true &&  
              completedTodos.map((item, index) => {
              return(
                <div className='todo-list-item' key = {index}>
                  <div className='first-half'>
                      <h3>{item.title}</h3>
                      <p>{item.descrip}</p>
                      <p><italic>Completed on: {item.completedOn}</italic></p>
                  </div>
                  <div>
                      <AiOutlineDelete onClick={()=>handleCompleteDeleteTodo(index)} className='icon'/>
                  </div>
                </div>
              )
             })}
          </div>
      </div>
    </div>
  );
}

export default App;