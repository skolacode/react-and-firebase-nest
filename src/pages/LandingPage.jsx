import { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { TODO_STATUS } from '../constants/todoStatus';

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
      setTodo("")
    }
  }

  /**
   * 
   * @param string id // the id field of the todo
   */
  const completeTheTodo = (id) => {

    const clonedArr = [...todoList]
    const getTodo = clonedArr.find((eachTodo) => eachTodo.id === id)

    if(getTodo) {
      getTodo.status = TODO_STATUS.COMPLETED
    }

    setTodoList(clonedArr)
  }

    /**
   * 
   * @param string id // the id field of the todo
   */
     const deleteTheTodo = (id) => {

      const clonedArr = [...todoList]
      const getTodo = clonedArr.find((eachTodo) => eachTodo.id === id)
  
      if(getTodo) {
        getTodo.status = TODO_STATUS.DELETED
      }
  
      setTodoList(clonedArr)
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
              todoList.map((eachTodo, key) => {

                let defaultStyle = { marginBottom: 5, paddingRight: 5}

                if(eachTodo.status === TODO_STATUS.COMPLETED) {
                  defaultStyle = { ...defaultStyle, backgroundColor: 'rgb(206, 216, 95)', color: 'white' }
                }
                else if(eachTodo.status === TODO_STATUS.DELETED) {
                  defaultStyle = { ...defaultStyle, backgroundColor: 'lightgrey', color: 'white' }
                }

                return (
                  <ListItem 
                    style={defaultStyle}
                    className='todoItemsContainer'
                    key={key}
                    disablePadding
                    disabled={eachTodo.status === TODO_STATUS.DELETED ? true : false}
                  >
                    <ListItemButton onClick={() => alert('i clicked as well')}>
                      <ListItemText primary={eachTodo.content} />
                    </ListItemButton>

                    {
                      eachTodo.status === TODO_STATUS.ACTIVE &&
                        <Button size="small" color="success" onClick={() => completeTheTodo(eachTodo.id)}>Done</Button>
                    }

                    {
                      eachTodo.status !== TODO_STATUS.DELETED &&
                        <Button size="small" color="error" onClick={() => deleteTheTodo(eachTodo.id)}>Delete</Button>
                    }
                  </ListItem>
                )
              })
            }
          </List>
        </div>
      }
    </div>
  )
}

export default LandingPage;


/**
 * Button yang available:
 * status
 * 1. completed - Delete
 * 2. Active - DONE | Delete
 * 3. deleted - 
 */
