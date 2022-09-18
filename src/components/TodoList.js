import React from 'react'
import { TODO_STATUS } from '../constants/todoStatus'
import { List, ListItem, ListItemButton, ListItemText, Button, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import '../styles/LandingPageStyle.css'

export const TodoList = ({ todosArr, editTodo, completeTheTodo, deleteTheTodo, title = '' }) => {

  // Spread operator, Destructure operator

  return (
    todosArr.length > 0 && 
    <div style={{ marginTop: 30 }}>
      {
        title !== '' &&
        <Typography>{title}</Typography>
      }
      <List className='todoListContainer'>
        {
          todosArr.map((eachTodo, key) => {

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
  )
}