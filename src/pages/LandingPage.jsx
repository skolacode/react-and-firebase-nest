import { useEffect, useState } from 'react';
import { Button, TextField} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { TODO_STATUS } from '../constants/todoStatus';

import '../styles/LandingPageStyle.css'
import { TodoList } from '../components/TodoList';

import { setDoc, doc, getDocs, collection } from "firebase/firestore"; 
import { firestore } from '../initFirebase';

const LandingPage = () => {

  // TODO
  /**
   * 1. Create a input box - DONE
   * 2. Create a save button - DONE
   * 3. After click save, we need to save the record in a todo state - DONE
   * 4. Display the saved todos - DONE
   * 
   * -- version v.0.2
   * a. Have a edit, delete and complete option - DONE
   * 
   * -- version v.0.3
   * a. Deleted and completed record will be moved to another list (shareable component)
   */


  // Save a current todo that is typed
  const [todo, setTodo] = useState("")

  /**
   * todoList design (array of object) = 
   * [
   *   {
   *     id: alphanumeric = 'asadsad13122' 
   *     content: string = '',
   *     status: boolean = 1|2|3
   *   }
   * ]
   * 
   * STATUS = {
   *   ACTIVE: 1,
   *   completed: 2,
   *   deleted: 3,
   * }
   * 
   * e.g: 
   * [
   *  {
   *   id: "asd1221asdasd",
   *  content: "i need to buy anis a gift",
   *  status: STATUS.ACTIVE
   *  }
   * ]
   */
  const [todoList, setTodoList] = useState([])
  const [completedTodoList, setCompletedTodoList] = useState([])
  const [deletedTodoList, setDeletedTodoList] = useState([])
  

  const saveTheTodo = () => {

    if(todo !== '') {
      // DEEP clone
      const clonedArr = [...todoList]
      
      // transform before save into array
      const transformedTodo = {
        id: uuidv4(),
        content: todo,
        status: TODO_STATUS.ACTIVE
      }

      clonedArr.push(transformedTodo)

      /**
       * TODO
       * 1. When get and string
       * 2. auto append the status and the id
       * 3. how to get the id? ANS = use UUID library to get unique id
       * 4. what status to append? ANS = ACTIVE (1)
       * 
       */
      
      setTodoList(clonedArr)
      saveToFB(transformedTodo)
      setTodo("")
    }
  }

  /**
   * 
   * @param string id // the id field of the todo
   */
  const completeTheTodo = (id) => {

    const clonedArr = [...todoList]
    
    const getTodoIndex = clonedArr.findIndex((eachTodo) => eachTodo.id === id)

    if(getTodoIndex !== -1) {

      // deep clone the completed array
      const cloneCompletedArr = [...completedTodoList]

      // push a new record to completed array
      cloneCompletedArr.push({
        ...clonedArr[getTodoIndex],
        status: TODO_STATUS.COMPLETED
      })

      // set completed array 
      setCompletedTodoList(cloneCompletedArr)

      // Remove from parent array
      clonedArr.splice(getTodoIndex, 1)
      // set the parent array with new array
      setTodoList(clonedArr)
    }
  }

  /**
   * 
   * @param string id // the id field of the todo
   */
  const deleteTheTodo = (id) => {

    const parentTodoList = [...todoList]
    const completedArr = [...completedTodoList]
    const allTodosArr = parentTodoList.concat(completedArr)

    const getTodoIndex = allTodosArr.findIndex((eachTodo) => eachTodo.id === id)

    if(getTodoIndex !== -1) {

      const deletedArr = [...deletedTodoList]

      deletedArr.push({
        ...allTodosArr[getTodoIndex],
        status: TODO_STATUS.DELETED
      })

      setDeletedTodoList(deletedArr)

      const todoListLength = parentTodoList.length
        
      if(getTodoIndex > (todoListLength-1)) {
        const getIndex = getTodoIndex - todoListLength
        completedArr.splice(getIndex, 1)
        setCompletedTodoList(completedArr)
      }
      else {
        parentTodoList.splice(getTodoIndex, 1)
        setTodoList(parentTodoList)
      }
    }
  }

  /**
   * 
   * @param object todoObj | this will contain the entier object of todo
   */
  const editTodo = (todoObj) => {

    setTodo(todoObj.content)

    const clonedArr = [...todoList]
    const getTodoIndex = clonedArr.findIndex((eachTodo) => eachTodo.id === todoObj.id)

    if(getTodoIndex !== -1) {
      clonedArr.splice(getTodoIndex, 1)
      setTodoList(clonedArr)
    }

  }

  const keydownTemp = (evt) => {

    if(evt.key === "Enter") {
      saveTheTodo()
    }
  }

  /**
   * async
   * ===
   * 1. code run line by line
   * 2. when have aysn function
   * 3. line 1 have aysnc function
   *     a. async nature adalah it won't complete instant
   *     b. it will take time to complete the process
   * 4. it will run line num 2 immediately 
   * 5. in order to run a 2nd line after async complete, we need to put await
   * 
   * non-async
   * ===
   * 1. run process and return value immediately
   */

  const FIREBASE_COLLECTION = {
    ANIS_TODO_APP: "anis-todo-app"
  }

  const saveToFB = async (todo) => {

    await setDoc(doc(firestore, FIREBASE_COLLECTION.ANIS_TODO_APP, todo.id), todo);

    alert('i saved to FB')
  }

  const getAllTodo = async () => {
    
    const querySnapshot = await getDocs(collection(firestore, FIREBASE_COLLECTION.ANIS_TODO_APP));

    const dataArr = []
    
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data())
    });

    setTodoList(dataArr)
  }

  useEffect(() => {
    // Get all the todo
    getAllTodo()
  }, [])

  return (
    <div className='container'>

      <div>
        <TextField
          onChange={(evt) => setTodo(evt.target.value)}
          id="outlined-basic" 
          label="Todo" 
          variant="outlined"
          placeholder='Enter your todo here...'
          value={todo}
          sx={{
            width: 400,
          }}
          onKeyDownCapture={keydownTemp}
        />
        <Button 
          onClick={saveTheTodo}
          
          variant="contained" 
          size="large"
          sx={{
            height: 55,
            marginLeft: 2
          }}
        >
          SAVE
        </Button>
      </div>

      <TodoList 
        todosArr={todoList} 
        editTodo={editTodo} 
        completeTheTodo={completeTheTodo} 
        deleteTheTodo={deleteTheTodo} 
      />

      <TodoList 
        todosArr={completedTodoList} 
        editTodo={editTodo} 
        completeTheTodo={completeTheTodo} 
        deleteTheTodo={deleteTheTodo} 
        title="Completed"
      />


      <TodoList 
        todosArr={deletedTodoList}
        editTodo={editTodo} 
        completeTheTodo={completeTheTodo} 
        deleteTheTodo={deleteTheTodo} 
        title="Deleted"
      />
    </div>
  )
}

export default LandingPage;
