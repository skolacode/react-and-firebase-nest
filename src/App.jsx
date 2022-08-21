import {useState} from 'react'
import './styles/App.css'

// ES6
// HOOK

// Mutate

// let firstName = "annis"
// setFirstName("burhan")
// console.log(firstName) -> burhan

const App = () => {

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
    </div>
  )
}

export default App;
