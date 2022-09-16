import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import '../styles/LandingPageStyle.css'

const LandingPage = () => {

  // TODO
  /**
   * 1. Create a input box - DONE
   * 2. Create a save button - DONE
   * 3. After click save, we need to save the record in a todo state
   * 4. Display the saved todos
   * 
   * -- version v.0.2
   * a. Have a edit, delete and complete option
   * 
   * -- version v.0.3
   * a. Deleted and completed record will be moved to another list
   */


  // Save a current todo that is typed
  const [todo, setTodo] = useState("")

  /**
   * todoList design = 
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
   *  content: "i need to buy anis a gift",
   *  status: STATUS.ACTIVE
   *  }
   * ]
   */
  const [todoList, setTodoList] = useState([])

  const saveTheTodo = () => {

    // DEEP clone
    const clonedArr = [...todoList]

    clonedArr.push(todo)

    setTodoList(clonedArr)
    setTodo("")
  }

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

      <div>
        {
          todoList.map((eachTodo, key) => (
            <p key={key}>{eachTodo}</p>
          ))
        }
      </div>
    </div>
  )
}

export default LandingPage;
