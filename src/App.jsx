import {useEffect, useState} from 'react'
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React SkolaCode
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
