import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { routeNames } from '../routes/routeNames';
import '../styles/App.css'

// ES6
// HOOK

// Mutate

// let firstName = "annis"
// setFirstName("burhan")
// console.log(firstName) -> burhan

const LandingPage = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const upddateNameState = (element) => {
    const valueName = element.target.value
    setName(valueName)
  }

  const [desc, setDesc] = useState("");

  const updateDescState = (element) => {
    const valueDesc = element.target.value
    setDesc(valueDesc)
  }

  const navigateToHome = () => { 
    navigate(routeNames.HOME, {state: {
      firstName: name,
      desc: desc
    }}) 
  }

  return (
    <div className='container'>

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          {
            [1,2,3].map((each) => (
              <ListItem key={each} disablePadding>
                <ListItemButton>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Box>

      <p>My Name is: {name}</p>
      <input
        type="text" 
        name="name" 
        id="name" 
        onChange={upddateNameState} 
      />

      <p>{desc}</p>
      <input
        type="text" 
        name="desc" 
        id="desc" 
        onChange={updateDescState} 
      />

        <button 
          onClick={navigateToHome}
        >
          Home
        </button>
    </div>
  )
}

export default LandingPage;
