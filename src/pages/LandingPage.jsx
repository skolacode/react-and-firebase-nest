import { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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

    const clonedArr = [...todoList]
    const getTodo = clonedArr.find((eachTodo) => eachTodo.id === id)

    if(getTodo) {
      getTodo.status = TODO_STATUS.DELETED
      setTodoList(clonedArr)
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
                    <ListItemButton onClick={() => editTodo(eachTodo)}>
                      <ListItemText primary={eachTodo.content} />
                    </ListItemButton>

                    {
                      eachTodo.status === TODO_STATUS.ACTIVE &&
                        <Button size="small" color="success" onClick={() => completeTheTodo(eachTodo.id)}>
                          <CheckCircleOutlineIcon />
                        </Button>
                    }

                    {
                      eachTodo.status !== TODO_STATUS.DELETED &&
                        <Button size="small" color="error" onClick={() => deleteTheTodo(eachTodo.id)}>
                          <RemoveCircleIcon />
                        </Button>
                    }
                  </ListItem>
                )
              })
            }
          </List>
        </div>
      }

      {
        completedTodoList.length > 0 && 
        <div style={{ marginTop: 20 }}>
          <Typography>Completed</Typography>
          <List className='todoListContainer'>
            {
              completedTodoList.map((eachTodo, key) => {

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
                    <ListItemButton onClick={() => editTodo(eachTodo)}>
                      <ListItemText primary={eachTodo.content} />
                    </ListItemButton>

                    {
                      eachTodo.status === TODO_STATUS.ACTIVE &&
                        <Button size="small" color="success" onClick={() => completeTheTodo(eachTodo.id)}>
                          <CheckCircleOutlineIcon />
                        </Button>
                    }

                    {
                      eachTodo.status !== TODO_STATUS.DELETED &&
                        <Button size="small" color="error" onClick={() => deleteTheTodo(eachTodo.id)}>
                          <RemoveCircleIcon />
                        </Button>
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
