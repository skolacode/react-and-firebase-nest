import { useLocation } from "react-router-dom";

const Home = () => {

  const location = useLocation()

  const {state} = location

  return (
    <div>
      <p>Hi {state.firstName}</p>
      <p>You are {state.desc}</p>
    </div>
  )
}

export default Home;
