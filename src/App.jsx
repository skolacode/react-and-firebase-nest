import {
  Outlet,
} from "react-router-dom";

const App = () => {

  return (
    <div>
      <h1>Shared Component</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App;
