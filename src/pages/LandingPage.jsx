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

  const [name, setName] = useState("hi");

  const upddateNameState = (element) => {
    const valueName = element.target.value
    setName(valueName)
  }

  return (
    <div className='container'>
      <p>My Name is: {name}</p>
      <input 
        type="text" 
        name="name" 
        id="name" 
        onChange={upddateNameState} />

        <Link to={routeNames.HOME}>Link Home</Link>

        <button onClick={() => { navigate(routeNames.HOME) }} >Home</button>
    </div>
  )
}

export default LandingPage;
