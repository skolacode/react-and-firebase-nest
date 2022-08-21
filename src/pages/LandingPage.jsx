import {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
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

        <Link to={routeNames.HOME}>Link Home</Link>

        <button 
          onClick={navigateToHome}
        >
          Home
        </button>
    </div>
  )
}

export default LandingPage;
