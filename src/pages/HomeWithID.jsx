import { useParams } from "react-router-dom";

const HomeWithID = () => {

  const params = useParams()

  console.log({params})

  return (
    <div>
      <p>Typed params are {params.newID}</p> 
    </div>
  )
}

export default HomeWithID;
