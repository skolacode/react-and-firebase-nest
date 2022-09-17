import { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import '../styles/LandingPageStyle.css'

const LandingPage = () => {

  // TODO
  /**
   * 1. Create a input box - DONE
   * 2. Create a save button - DONE
   * 3. After click save, we need to save the record in a todo state - DONE
   * 4. Display the saved todos - DONE
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
   *   id: "asd1221asdasd",
   *  content: "i need to buy anis a gift",
   *  status: STATUS.ACTIVE
   *  }
   * ]
   */
  const [todoList, setTodoList] = useState([])

  const saveTheTodo = () => {

    if(todo !== '') {
      // DEEP clone
      const clonedArr = [...todoList]
      
      clonedArr.push(todo)
      
      setTodoList(clonedArr)
      setTodo("")
    }
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

      {
        todoList.length > 0 && 
        <div className='todoListContainer'>
          <List style={{ backgroundColor: 'white' }}>
            {
              todoList.map((eachTodo, key) => (
                <ListItem style={{ marginBottom: 5 }} className='todoItemsContainer' key={key} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={eachTodo} />
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </div>
      }
    </div>
  )
}

export default LandingPage;
